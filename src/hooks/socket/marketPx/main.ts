import React from 'react';

import {useSession} from 'next-auth/react';

import {errorDispatchers} from '../../../state/error/dispatchers';
import {ErrorDispatcherName} from '../../../state/error/types';
import {pxDataDispatchers} from '../../../state/pxData/dispatchers';
import {PxDataDispatcherName} from '../../../state/pxData/types';
import {useDispatch} from '../../../state/store';
import {generateSocketClient} from '../../../utils/socket';
import {useSocketEventHandler} from '../utils';
import {MarketPxDataSocket, MarketPxSubscriptionMessage} from './type';


type UseMarketPxSocketOpts = {
  security: string,
};

export const useMarketPxSocket = ({security}: UseMarketPxSocketOpts): MarketPxDataSocket | undefined => {
  const [socket, setSocket] = React.useState<MarketPxDataSocket>();
  const {data: session} = useSession();
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

  // Hooks
  React.useEffect(() => {
    const socket = generateSocketClient('/px-market');
    const subscriptionMessage: MarketPxSubscriptionMessage = {
      token: session?.user.token,
      security,
    };

    const onDisconnect = () => {
      socket.emit('unsubscribe', JSON.stringify(subscriptionMessage));
    };

    // System events
    socket.on('connect_error', onConnectionError);
    socket.on('disconnect', onDisconnect);

    // Custom events
    socket.on('updated', onUpdated);

    socket.emit('subscribe', JSON.stringify(subscriptionMessage));

    setSocket(socket);

    return () => {
      socket.off('updated', onUpdated);
      socket.off('disconnect', onDisconnect);

      socket.emit('unsubscribe', JSON.stringify(subscriptionMessage));

      socket.close();
    };
  }, []);

  return socket;
};
