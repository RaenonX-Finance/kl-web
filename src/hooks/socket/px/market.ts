import React from 'react';

import {useSession} from 'next-auth/react';

import {PxDataSubscriptionInfo} from '../../../state/pxData/types';
import {MarketPxSubscriptionMessage, PxDataSocket} from './type';


type UseMarketPxUpdateHandlerOpts = PxDataSubscriptionInfo & {
  socket: PxDataSocket | undefined,
};

export const useMarketPxUpdateHandler = ({socket, identifiers}: UseMarketPxUpdateHandlerOpts) => {
  const {data} = useSession();

  React.useEffect(() => {
    if (!socket || !identifiers.length) {
      return;
    }

    const subscriptionMessage: MarketPxSubscriptionMessage = {
      token: data?.user.token,
      identifiers,
    };

    const onDisconnect = () => {
      socket.emit('unsubscribe', subscriptionMessage);
    };

    socket.on('disconnect', onDisconnect);
    socket.emit('subscribe', subscriptionMessage);

    return () => {
      socket.off('disconnect', onDisconnect);
      socket.emit('unsubscribe', subscriptionMessage);
    };
  }, [socket, identifiers]);
};
