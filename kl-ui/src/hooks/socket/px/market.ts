import React from 'react';

import {MarketPxSubscriptionData} from 'kl-web-common/models/socket/marketData';
import {useSession} from 'next-auth/react';

import {PxDataSocket} from './type';
import {PxDataSubscriptionInfo} from '../../../state/pxData/types';


type UseMarketPxUpdateHandlerOpts = PxDataSubscriptionInfo & {
  socket: PxDataSocket | undefined,
};

export const useMarketPxUpdateHandler = ({socket, identifiers}: UseMarketPxUpdateHandlerOpts) => {
  const {data} = useSession();

  React.useEffect(() => {
    const token = data?.user.token;

    if (!socket || !identifiers.length) {
      return;
    } else if (!token) {
      console.warn('Token unavailable for subscribing market data');
      return;
    }

    const subscriptionMessage: MarketPxSubscriptionData = {token, identifiers};

    const onDisconnect = () => {
      socket.emit('unsubscribe', subscriptionMessage);
    };

    socket.on('disconnect', onDisconnect);
    socket.emit('subscribe', subscriptionMessage);

    return () => {
      socket.off('disconnect', onDisconnect);
      socket.emit('unsubscribe', subscriptionMessage);
    };
  }, [socket, identifiers, data?.user.token]);
};
