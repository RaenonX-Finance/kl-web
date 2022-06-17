import React from 'react';

import {customSrDispatchers} from '../../state/customSr/dispatchers';
import {SrCustomDispatcherName} from '../../state/customSr/types';
import {errorDispatchers} from '../../state/error/dispatchers';
import {ErrorDispatcherName} from '../../state/error/types';
import {pxDataDispatchers} from '../../state/pxData/dispatchers';
import {PxDataDispatcherName} from '../../state/pxData/types';
import {useDispatch} from '../../state/store';
import {InitData} from '../../types/init';
import {DataSocket} from '../../types/socket/type';
import {useSocket} from './main';
import {useSocketEventHandler} from './utils';


export const useSocketInit = (): DataSocket => {
  const socket = useSocket();
  const lastUpdate = React.useRef(0);

  if (!socket) {
    throw new Error('Socket not defined');
  }

  const dispatch = useDispatch();

  const refreshStatus = React.useCallback((forceOpenOrderRefresh: boolean = false) => {
    const now = Date.now();

    // Only refresh once per 3 secs
    // > not using `setInterval()` because the frequency is more unreliable
    if (now - lastUpdate.current < 3000) {
      return;
    }

    lastUpdate.current = now;
    socket.emit('position', '');
    socket.emit('execution', '');
    if (forceOpenOrderRefresh) {
      socket.emit('openOrder', '');
    }
  }, []);

  // Events
  const onInit = React.useCallback((message: string) => {
    const data: InitData = JSON.parse(message);
    const {customSrLevelDict} = data;

    dispatch(customSrDispatchers[SrCustomDispatcherName.UPDATE](customSrLevelDict));
  }, []);

  const onPxInit = useSocketEventHandler(dispatch, pxDataDispatchers[PxDataDispatcherName.INIT], refreshStatus);
  const onPxUpdated = useSocketEventHandler(dispatch, pxDataDispatchers[PxDataDispatcherName.UPDATE]);
  const onPxUpdatedMarket = useSocketEventHandler(
    dispatch,
    pxDataDispatchers[PxDataDispatcherName.UPDATE_MARKET],
    refreshStatus,
  );
  const onError = useSocketEventHandler(
    dispatch,
    errorDispatchers[ErrorDispatcherName.UPDATE],
    () => refreshStatus(true),
  );

  React.useEffect(() => {
    socket.on('init', onInit);
    socket.on('pxUpdated', onPxUpdated);
    socket.on('pxUpdatedMarket', onPxUpdatedMarket);
    socket.on('pxInit', onPxInit);
    socket.on('error', onError);

    socket.emit('init', '');
    socket.emit('pxInit', '');

    return () => {
      socket.off('init', onInit);
      socket.off('pxUpdated', onPxUpdated);
      socket.off('pxUpdatedMarket', onPxUpdatedMarket);
      socket.off('pxInit', onPxInit);
      socket.off('error', onError);
    };
  }, []);

  return socket;
};
