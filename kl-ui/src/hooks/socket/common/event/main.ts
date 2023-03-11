import React from 'react';

import {EventsMap} from '@socket.io/component-emitter';
import {Socket} from 'socket.io-client';

import {UseCommonSocketEventHandlersOpts, UseCommonSocketEventHandlersReturn} from './type';
import {errorDispatchers} from '../../../../state/error/dispatchers';
import {ErrorDispatcherName} from '../../../../state/error/types';
import {useDispatch} from '../../../../state/store';
import {getErrorMessage} from '../../../../utils/error';


const ERROR_POPUP_TIMEOUT_MS = 7000;

export const useCommonSocketEventHandlers = <S2C extends EventsMap, C2S extends EventsMap>({
  name,
  socket,
}: UseCommonSocketEventHandlersOpts<S2C, C2S>): UseCommonSocketEventHandlersReturn => {
  const dispatch = useDispatch();
  const [timeoutIds, setTimeoutIds] = React.useState<number[]>([]);

  const queueError = (message: string) => {
    setTimeoutIds((timeoutIds) => [
      ...timeoutIds,
      window.setTimeout(() => {
        dispatch(errorDispatchers[ErrorDispatcherName.UPDATE]({message}));
      }, ERROR_POPUP_TIMEOUT_MS),
    ]);
  };

  const onConnected = React.useCallback(() => {
    console.info(`Socket [${socket?.id}] connected`);

    timeoutIds.forEach((timeoutId) => window.clearTimeout(timeoutId));
    setTimeoutIds([]);

    dispatch(errorDispatchers[ErrorDispatcherName.HIDE_ERROR]());
  }, [timeoutIds]);

  const onConnectionError = React.useCallback((err: Error) => {
    console.error(`Socket [${socket?.id}] connection error - reconnecting...`, err);

    let errorMessage = getErrorMessage({err});
    if (errorMessage === 'xhr poll error') {
      errorMessage = '無法連線至主機';
    }

    queueError(`${name} Socket 連線錯誤 (${errorMessage})，嘗試重新連線中...`);
    socket?.connect();
  }, []);

  const onDisconnect = React.useCallback((reason: Socket.DisconnectReason) => {
    console.warn(`Socket [${socket?.id}] disconnected (${reason}) - reconnecting...`);

    if (reason === 'io server disconnect') {
      dispatch(errorDispatchers[ErrorDispatcherName.UPDATE]({message: '連線已中斷。請檢查帳戶是否多開。'}));
      return;
    }

    queueError(`${name} Socket 連線中斷 (${reason})，嘗試重新連線中...`);
    socket?.connect();
  }, []);

  React.useEffect(() => {
    if (!socket) {
      return;
    }

    // System events
    socket.on('connect', onConnected);
    socket.on('connect_error', onConnectionError);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnected);
      socket.off('connect_error', onConnectionError);
      socket.off('disconnect', onDisconnect);
    };
  }, [!!socket]);

  return {onConnected, onConnectionError, onDisconnect};
};
