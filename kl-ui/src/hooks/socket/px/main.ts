import React from 'react';

import {PxSocketS2CEvents} from 'kl-web-common/models/socket/data';

import {usePxInitHandler} from './init';
import {useMarketPxUpdateHandler} from './market';
import {PxDataSocket} from './type';
import {dataDispatchers} from '../../../state/data/dispatchers';
import {DataDispatcherName} from '../../../state/data/types';
import {errorDispatchers} from '../../../state/error/dispatchers';
import {ErrorDispatcherName} from '../../../state/error/types';
import {pxDataDispatchers} from '../../../state/pxData/dispatchers';
import {PxDataDispatcherName} from '../../../state/pxData/types';
import {useDispatch} from '../../../state/store';
import {generatePxSocketClient} from '../../../utils/socket';
import {useCommonSocketEventHandlers} from '../common/event/main';


export const usePxSocket = (): PxDataSocket | undefined => {
  const [socket, setSocket] = React.useState<PxDataSocket>();
  const dispatch = useDispatch();

  usePxInitHandler();
  useMarketPxUpdateHandler({socket});
  useCommonSocketEventHandlers({
    name: '報價',
    socket,
  });

  // Custom events
  const onMarket: PxSocketS2CEvents['market'] = React.useCallback((data) => (
    dispatch(pxDataDispatchers[PxDataDispatcherName.UPDATE_MARKET](data))
  ), []);
  const onCalculated: PxSocketS2CEvents['calculated'] = React.useCallback((data) => {
    dispatch(pxDataDispatchers[PxDataDispatcherName.UPDATE_COMPLETE](data));
  }, []);
  const onMinChanged: PxSocketS2CEvents['minChange'] = React.useCallback((data) => {
    dispatch(dataDispatchers[DataDispatcherName.MIN_CHANGE](data));
  }, []);
  const onMarketDateCutoff: PxSocketS2CEvents['marketDateCutoff'] = React.useCallback((symbols) => {
    dispatch(pxDataDispatchers[PxDataDispatcherName.CLEAR_SR_LEVELS](symbols));
  }, []);
  const onError: PxSocketS2CEvents['error'] = React.useCallback((message) => {
    dispatch(errorDispatchers[ErrorDispatcherName.UPDATE]({message}));
  }, []);

  // Hooks
  React.useEffect(() => {
    const socket = generatePxSocketClient();

    // Custom events
    socket.on('market', onMarket);
    socket.on('calculated', onCalculated);
    socket.on('minChange', onMinChanged);
    socket.on('marketDateCutoff', onMarketDateCutoff);
    socket.on('error', onError);

    setSocket(socket);

    return () => {
      socket.off('market', onMarket);
      socket.off('calculated', onCalculated);
      socket.off('minChange', onMinChanged);
      socket.off('marketDateCutoff', onMarketDateCutoff);
      socket.off('error', onError);

      socket.close();
    };
  }, []);

  return socket;
};
