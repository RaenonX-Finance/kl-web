import React from 'react';

import {customSrDispatchers} from '../../../state/customSr/dispatchers';
import {SrCustomDispatcherName} from '../../../state/customSr/types';
import {errorDispatchers} from '../../../state/error/dispatchers';
import {ErrorDispatcherName} from '../../../state/error/types';
import {pxDataDispatchers} from '../../../state/pxData/dispatchers';
import {PxDataDispatcherName} from '../../../state/pxData/types';
import {useDispatch} from '../../../state/store';
import {InitData} from '../../../types/init';
import {PxDataSocket, SocketMessage} from '../../../types/socket/type';
import {generateSocketClient} from '../../../utils/socket';
import {ensureStringMessage, useSocketEventHandler} from '../utils';


export const usePxSocketInit = (): PxDataSocket | undefined => {
  const [socket, setSocket] = React.useState<PxDataSocket>();
  const lastUpdate = React.useRef(0);

  const dispatch = useDispatch();
  const {signIn} = useNextAuthCall();

  const refreshStatus = React.useCallback(() => {
    const now = Date.now();

    // Only refresh once per 3 secs
    // > not using `setInterval()` because the frequency is more unreliable
    if (now - lastUpdate.current < 3000) {
      return;
    }

    lastUpdate.current = now;
  }, []);

  // Events
  const onConnectionError = (err: Error) => {
    console.error(err);
    dispatch(errorDispatchers[ErrorDispatcherName.UPDATE]({message: err.message}));
  };
  const onInit = React.useCallback((message: SocketMessage) => {
    const data: InitData = JSON.parse(ensureStringMessage(message));
    const {customSrLevelDict} = data;

    dispatch(customSrDispatchers[SrCustomDispatcherName.UPDATE](customSrLevelDict));
  }, []);
  const onPxInit = useSocketEventHandler({
    dispatch,
    action: pxDataDispatchers[PxDataDispatcherName.INIT],
    afterAction: refreshStatus,
  });
  const onPxUpdated = useSocketEventHandler({
    dispatch,
    action: pxDataDispatchers[PxDataDispatcherName.UPDATE],
  });
  const onPxUpdatedMarket = useSocketEventHandler({
    dispatch,
    action: pxDataDispatchers[PxDataDispatcherName.UPDATE_MARKET],
    afterAction: refreshStatus,
  });
  const onError = useSocketEventHandler({
    dispatch,
    action: errorDispatchers[ErrorDispatcherName.UPDATE],
    afterAction: refreshStatus,
  });

  React.useEffect(() => {
    const socket = generateSocketClient();

    // System events
    socket.on('connect_error', onConnectionError);

    // Custom events
    socket.on('init', onInit);
    socket.on('pxUpdated', onPxUpdated);
    socket.on('pxUpdatedMarket', onPxUpdatedMarket);
    socket.on('pxInit', onPxInit);
    socket.on('error', onError);

    socket.emit('init', '');
    socket.emit('pxInit', '');

    setSocket(socket);

    return () => {
      socket.off('init', onInit);
      socket.off('pxUpdated', onPxUpdated);
      socket.off('pxUpdatedMarket', onPxUpdatedMarket);
      socket.off('pxInit', onPxInit);
      socket.off('error', onError);

      socket.close();
    };
  }, []);

  return socket;
};
