import React from 'react';

import {dataDispatchers} from '../../../state/data/dispatchers';
import {DataDispatcherName} from '../../../state/data/types';
import {errorDispatchers} from '../../../state/error/dispatchers';
import {ErrorDispatcherName} from '../../../state/error/types';
import {pxDataDispatchers} from '../../../state/pxData/dispatchers';
import {PxDataDispatcherName, PxDataSubscriptionInfo} from '../../../state/pxData/types';
import {useDispatch} from '../../../state/store';
import {generateSocketClient} from '../../../utils/socket';
import {useSocketEventHandler} from '../utils';
import {useHistoryDataRequestHandler} from './historyRequest';
import {usePxInitHandler} from './init';
import {useMarketPxUpdateHandler} from './market';
import {PxDataSocket} from './type';


type UsePxSocketOpts = PxDataSubscriptionInfo;

export const usePxSocket = ({identifiers}: UsePxSocketOpts): PxDataSocket | undefined => {
  const [socket, setSocket] = React.useState<PxDataSocket>();
  useMarketPxUpdateHandler({socket, identifiers});
  useHistoryDataRequestHandler({identifiers});
  usePxInitHandler();
  const dispatch = useDispatch();

  // System events
  const onConnectionError = (err: Error) => {
    console.error(err);
    dispatch(errorDispatchers[ErrorDispatcherName.UPDATE]({message: err.message}));
  };

  // Custom events
  const onUpdated = useSocketEventHandler({
    dispatch,
    action: pxDataDispatchers[PxDataDispatcherName.UPDATE_MARKET],
  });
  const onRequested = useSocketEventHandler({
    dispatch,
    action: pxDataDispatchers[PxDataDispatcherName.UPDATE_COMPLETE],
  });
  const onMinChanged = useSocketEventHandler({
    dispatch,
    action: dataDispatchers[DataDispatcherName.MIN_CHANGE],
  });

  // Hooks
  React.useEffect(() => {
    const socket = generateSocketClient('/px');

    // System events
    socket.on('connect_error', onConnectionError);

    // Custom events
    socket.on('updated', onUpdated);
    socket.on('request', onRequested);
    socket.on('minChange', onMinChanged);

    setSocket(socket);

    return () => {
      socket.off('connect_error', onConnectionError);
      socket.off('updated', onUpdated);
      socket.off('request', onRequested);

      socket.close();
    };
  }, []);

  return socket;
};
