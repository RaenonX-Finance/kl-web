import React from 'react';

import {MarketPxSubscriptionData} from 'kl-web-common/models/socket/marketData';
import {useSession} from 'next-auth/react';

import {PxDataSocket} from './type';
import {usePxDataSubscriptionInfoSelector} from '../../../state/pxData/selector';


type UseMarketPxUpdateHandlerOpts = {
  socket: PxDataSocket | undefined,
};

export const useMarketPxUpdateHandler = ({socket}: UseMarketPxUpdateHandlerOpts) => {
  const {data} = useSession();
  const {identifiers} = usePxDataSubscriptionInfoSelector();

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
