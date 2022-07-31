import React from 'react';

import {useSession} from 'next-auth/react';

import {useSharedConfigSelector} from '../../../state/config/selector';
import {getSharedConfig} from '../../../state/config/utils';
import {usePxSlotIdentifier} from '../../../state/pxData/selector';
import {PxDataSubscriptionInfo} from '../../../state/pxData/types';
import {PxSlotName} from '../../../types/pxData';
import {PxSocketContext} from './const';
import {PxDataSocket, RequestPxMessage} from './type';


type UseHistoryDataRequestHandlerOpts = Pick<PxDataSubscriptionInfo, 'identifiers'> & {
  socket: PxDataSocket | undefined,
};

export const useHistoryDataRequestHandler = ({socket, identifiers}: UseHistoryDataRequestHandlerOpts) => {
  const {data} = useSession();
  const sharedConfig = useSharedConfigSelector();

  // Periodic px data request
  React.useEffect(() => {
    if (!socket || !identifiers.length || !sharedConfig) {
      return;
    }

    const intervalId = setInterval(() => {
      const requestMessage: RequestPxMessage = {
        token: data?.user?.token,
        requests: identifiers.map((identifier) => ({identifier})),
      };
      socket.emit('request', requestMessage);
    }, getSharedConfig(sharedConfig, 'intervalHistoryPxSec') * 1000);

    return () => clearInterval(intervalId);
  }, [socket, identifiers, sharedConfig?.intervalHistoryPxSec]);

  // Immediate px data request on `identifiers` changed
  React.useEffect(() => {
    const requestMessage: RequestPxMessage = {
      token: data?.user?.token,
      requests: identifiers.map((identifier) => ({identifier})),
    };
    socket?.emit('request', requestMessage);
  }, [identifiers]);
};

type UseOlderHistoryDataFetchOpts = {
  slot: PxSlotName,
};

type UseOlderHistoryDataFetchReturn = {
  requestPxData: (offset: number) => void,
};

export const useOlderHistoryDataFetcher = ({slot}: UseOlderHistoryDataFetchOpts): UseOlderHistoryDataFetchReturn => {
  const {data} = useSession();
  const socket = React.useContext(PxSocketContext);
  const identifier = usePxSlotIdentifier(slot);
  const requesting = React.useRef(false); // To debounce

  const token = data?.user?.token;
  const onCompletedRequest = () => requesting.current = false;

  const requestPxData = (offset: number) => {
    if (!socket) {
      throw Error('Socket is [null] while requesting older px data');
    }
    if (!identifier) {
      throw Error(`Unique identifier for slot ${slot} is [null] while requesting older px data`);
    }
    if (requesting.current) {
      return;
    }

    const requestMessage: RequestPxMessage = {
      token,
      requests: [{identifier, offset}],
    };
    requesting.current = true;
    socket.emit('request', requestMessage);
    if (!socket.listeners('request').includes(onCompletedRequest)) {
      socket.on('request', onCompletedRequest);
    }
  };

  return {requestPxData};
};
