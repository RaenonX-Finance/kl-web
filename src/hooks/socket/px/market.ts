import React from 'react';

import {useSession} from 'next-auth/react';

import {PxDataSubscriptionInfo} from '../../../state/pxData/types';
import {MarketPxSubscriptionMessage, PxDataSocket} from './type';


type UseMarketPxUpdateHandlerOpts = Pick<PxDataSubscriptionInfo, 'securities'> & {
  socket: PxDataSocket | undefined,
};

export const useMarketPxUpdateHandler = ({socket, securities}: UseMarketPxUpdateHandlerOpts) => {
  const {data} = useSession();

  React.useEffect(() => {
    if (!socket || !securities.length) {
      return;
    }

    const subscriptionMessage: MarketPxSubscriptionMessage = {
      token: data?.user.token,
      securities,
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
  }, [socket, securities]);
};
