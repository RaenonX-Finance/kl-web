import React from 'react';

import {EventsMap} from '@socket.io/component-emitter';
import {Socket} from 'socket.io-client';

import {UseCommonSocketEventHandlersOpts, UseCommonSocketEventHandlersReturn} from './type';
import {errorDispatchers} from '../../../../state/error/dispatchers';
import {ErrorDispatcherName} from '../../../../state/error/types';
import {useDispatch} from '../../../../state/store';
import {getErrorMessage} from '../../../../utils/error';


const ERROR_POPUP_TIMEOUT_MS = 7000;

const RECONNECT_INTERVAL_MS = 5000;

export const useCommonSocketEventHandlers = <S2C extends EventsMap, C2S extends EventsMap>({
  name,
  socket,
  onConnected,
  deps,
}: UseCommonSocketEventHandlersOpts<S2C, C2S>): UseCommonSocketEventHandlersReturn => {
  const dispatch = useDispatch();
  const [timeoutIds, setTimeoutIds] = React.useState<number[]>([]);
  const [reconnectId, setReconnectId] = React.useState<number>();

  // `timeoutIds` and `reconnectId` is needed because handlers is using these variables, which could be updated
  const dependencies = [!!socket, socket?.connected, timeoutIds, reconnectId, ...(deps || [])];

  const reconnect = React.useCallback(() => {
    if (reconnectId) {
      // Already has periodic reconnect
      return;
    }
    if (!socket) {
      throw new Error('Socket is `undefined` during reconnection');
    }

    setReconnectId(window.setInterval(
      () => {
        console.log(`Reconnecting ${name} socket...`);
        socket.connect();
      }, RECONNECT_INTERVAL_MS));
  }, dependencies);

  const queueError = React.useCallback((message: string) => {
    setTimeoutIds((timeoutIds) => [
      ...timeoutIds,
      window.setTimeout(
        () => dispatch(errorDispatchers[ErrorDispatcherName.UPDATE]({message})),
        ERROR_POPUP_TIMEOUT_MS,
      ),
    ]);
  }, []);

  const onConnectedInternal = React.useCallback(() => {
    console.info(`${name} Socket [${socket?.id}] connected`);

    timeoutIds.forEach((timeoutId) => window.clearTimeout(timeoutId));
    setTimeoutIds([]);

    window.clearInterval(reconnectId);
    setReconnectId(undefined);

    dispatch(errorDispatchers[ErrorDispatcherName.HIDE_ERROR]());

    if (onConnected) {
      onConnected();
    }
  }, dependencies);

  const onConnectionError = (err: Error) => {
    console.error(`${name} Socket connection error - reconnecting...`, err);

    let errorMessage = getErrorMessage({err});
    if (errorMessage === 'xhr poll error') {
      errorMessage = '無法連線至主機';
    }

    queueError(`${name} Socket 連線錯誤 (${errorMessage})，嘗試重新連線中...`);
    reconnect();
  };

  const onDisconnect = React.useCallback((reason: Socket.DisconnectReason) => {
    console.warn(`${name} Socket disconnected (${reason}) - reconnecting...`);

    if (reason === 'io server disconnect') {
      dispatch(errorDispatchers[ErrorDispatcherName.UPDATE]({message: '連線已中斷。請檢查帳戶是否多開。'}));
      return;
    }

    queueError(`${name} Socket 連線中斷 (${reason})，嘗試重新連線中...`);
    reconnect();
  }, dependencies);

  React.useEffect(() => {
    if (!socket) {
      return;
    }

    // System events
    socket.on('connect', onConnectedInternal);
    socket.on('connect_error', onConnectionError);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnectedInternal);
      socket.off('connect_error', onConnectionError);
      socket.off('disconnect', onDisconnect);
    };
  }, dependencies);

  return {onConnected: onConnectedInternal, onConnectionError, onDisconnect};
};
