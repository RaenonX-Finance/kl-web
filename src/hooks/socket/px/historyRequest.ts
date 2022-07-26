import React from 'react';

import {useSession} from 'next-auth/react';

import {useSharedConfigSelector} from '../../../state/config/selector';
import {getSharedConfig} from '../../../state/config/utils';
import {PxDataSubscriptionInfo} from '../../../state/pxData/types';
import {PxDataSocket, RequestPxMessage} from './type';


type UseHistoryDataRequestHandlerOpts = Pick<PxDataSubscriptionInfo, 'identifiers'> & {
  socket: PxDataSocket | undefined,
};

export const useHistoryDataRequestHandler = ({socket, identifiers}: UseHistoryDataRequestHandlerOpts) => {
  const {data} = useSession();
  const sharedConfig = useSharedConfigSelector();

  React.useEffect(() => {
    if (!socket || !identifiers.length || !sharedConfig) {
      return;
    }

    const intervalId = setInterval(() => {
      const requestMessage: RequestPxMessage = {
        token: data?.user?.token,
        requests: identifiers.map((identifier) => ({identifier, offset: null})),
      };
      socket.emit('request', requestMessage);
    }, getSharedConfig(sharedConfig, 'intervalHistoryPxSec') * 1000);

    return () => clearInterval(intervalId);
  }, [socket, identifiers, sharedConfig?.intervalHistoryPxSec]);
};
