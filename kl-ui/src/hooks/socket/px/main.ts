import React from 'react';

import {PxSocketS2CEvents} from 'kl-web-common/models/socket/data';
import {useSession} from 'next-auth/react';

import {useHistoryDataRequestHandler} from './historyRequest';
import {usePxInitHandler} from './init';
import {useMarketPxUpdateHandler} from './market';
import {PxDataSocket} from './type';
import {dataDispatchers} from '../../../state/data/dispatchers';
import {DataDispatcherName} from '../../../state/data/types';
import {errorDispatchers} from '../../../state/error/dispatchers';
import {ErrorDispatcherName} from '../../../state/error/types';
import {pxDataDispatchers} from '../../../state/pxData/dispatchers';
import {usePxDataSubscriptionInfoSelector} from '../../../state/pxData/selector';
import {PxDataDispatcherName} from '../../../state/pxData/types';
import {useDispatch} from '../../../state/store';
import {apiRequestPxData} from '../../../utils/api/px';
import {generatePxSocketClient} from '../../../utils/socket';
import {useHandleAxiosError} from '../../axios';
import {useCommonSocketEventHandlers} from '../common/event/main';


export const usePxSocket = (): PxDataSocket | undefined => {
  const {data} = useSession();
  const [socket, setSocket] = React.useState<PxDataSocket>();
  const {onError: onAxiosError} = useHandleAxiosError();
  const {identifiers} = usePxDataSubscriptionInfoSelector();
  useMarketPxUpdateHandler({socket, identifiers});
  useHistoryDataRequestHandler({identifiers});
  usePxInitHandler();
  const dispatch = useDispatch();

  const token = data?.user?.token;
  useCommonSocketEventHandlers({
    name: '報價',
    socket,
  });

  // Custom events
  const onMarket: PxSocketS2CEvents['market'] = React.useCallback((data) => (
    dispatch(pxDataDispatchers[PxDataDispatcherName.UPDATE_MARKET](data))
  ), []);
  const onRequested: PxSocketS2CEvents['request'] = React.useCallback((symbols) => {
    if (!token) {
      throw new Error('Received px data request socket event, but token is unavailable');
    }

    const socketRequesting = new Set(symbols);
    const actualToRequest = identifiers
      .filter((identifier) => socketRequesting.has(identifier.split('@')[0]));

    if (!actualToRequest.length) {
      console.warn(
        'Received request to get Px data (1), but no matching identifiers to fetch the data (2)',
        symbols,
        identifiers,
      );
      return;
    }

    apiRequestPxData({
      token,
      requests: actualToRequest.map((identifier) => ({identifier, limit: 2})),
    })
      .then(({data}) => dispatch(pxDataDispatchers[PxDataDispatcherName.UPDATE_COMPLETE](data)))
      .catch(onAxiosError);
  }, [identifiers, token]);
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
    socket.on('request', onRequested);
    socket.on('minChange', onMinChanged);
    socket.on('marketDateCutoff', onMarketDateCutoff);
    socket.on('error', onError);

    setSocket(socket);

    return () => {
      socket.off('market', onMarket);
      socket.off('request', onRequested);
      socket.off('minChange', onMinChanged);
      socket.off('marketDateCutoff', onMarketDateCutoff);
      socket.off('error', onError);

      socket.close();
    };
  }, [identifiers]); // `identifiers` could be empty when Px socket is already initialized

  return socket;
};
