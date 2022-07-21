import React from 'react';

import {useSession} from 'next-auth/react';

import {PxDataSubscriptionInfo} from '../../../state/pxData/types';
import {PxDataSocket, RequestPxMessage} from './type';


type UseHistoryDataRequestHandlerOpts = Pick<PxDataSubscriptionInfo, 'identifiers'> & {
  socket: PxDataSocket | undefined,
};

export const useHistoryDataRequestHandler = ({socket, identifiers}: UseHistoryDataRequestHandlerOpts) => {
  const {data} = useSession();

  React.useEffect(() => {
    if (!socket || !identifiers.length) {
      return;
    }

    const intervalId = setInterval(() => {
      const requestMessage: RequestPxMessage = {
        token: data?.user?.token,
        identifiers,
      };
      socket.emit('request', requestMessage);
      // FIXME: To use global config here - historyDataInterval
    }, 3000);

    return () => clearInterval(intervalId);
  }, [socket, identifiers]);
};
