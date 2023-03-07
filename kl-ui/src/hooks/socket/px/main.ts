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
import {getErrorMessage} from '../../../utils/error';
import {generatePxSocketClient} from '../../../utils/socket';
import {useHandleAxiosError} from '../../axios';


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

  // System events
  const onConnectionError = (err: Error) => {
    console.error(err);
    dispatch(errorDispatchers[ErrorDispatcherName.UPDATE]({
      message: `報價 Socket 連線錯誤: ${getErrorMessage({err})}`,
    }));
  };

  // Custom events
  const onMarket: PxSocketS2CEvents['market'] = (data) => (
    dispatch(pxDataDispatchers[PxDataDispatcherName.UPDATE_MARKET](data))
  );
  const onRequested: PxSocketS2CEvents['request'] = (symbols) => {
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
  };
  const onMinChanged: PxSocketS2CEvents['minChange'] = (data) => (
    dispatch(dataDispatchers[DataDispatcherName.MIN_CHANGE](data))
  );

  const onError: PxSocketS2CEvents['error'] = (message) => {
    dispatch(errorDispatchers[ErrorDispatcherName.UPDATE]({message}));
  };

  // Hooks
  React.useEffect(() => {
    const socket = generatePxSocketClient();

    // System events
    socket.on('connect_error', onConnectionError);

    // Custom events
    socket.on('market', onMarket);
    socket.on('request', onRequested);
    socket.on('minChange', onMinChanged);
    socket.on('error', onError);

    setSocket(socket);

    return () => {
      socket.off('connect_error', onConnectionError);
      socket.off('market', onMarket);
      socket.off('request', onRequested);
      socket.off('minChange', onMinChanged);
      socket.off('error', onError);

      socket.close();
    };
  }, [identifiers]); // `identifiers` could be empty when Px socket is already initialized

  return socket;
};
