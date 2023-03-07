import React from 'react';

import {useSession} from 'next-auth/react';

import {pxDataDispatchers} from '../../../state/pxData/dispatchers';
import {usePxSlotIdentifier} from '../../../state/pxData/selector';
import {PxDataDispatcherName, PxDataSubscriptionInfo} from '../../../state/pxData/types';
import {useDispatch} from '../../../state/store';
import {PxSlotName} from '../../../types/pxData';
import {apiRequestPxData} from '../../../utils/api/px';


type UseHistoryDataRequestHandlerOpts = Pick<PxDataSubscriptionInfo, 'identifiers'>;

export const useHistoryDataRequestHandler = ({identifiers}: UseHistoryDataRequestHandlerOpts) => {
  const {data} = useSession();
  const dispatch = useDispatch();
  const token = data?.user?.token;

  // Immediate px data request on `identifiers` changed
  React.useEffect(() => {
    if (!token) {
      throw new Error('Token unavailable - unable to immediately request Px data on identifier change');
    }

    if (!identifiers.length) {
      // Skip sending request if identifiers are empty
      return;
    }

    apiRequestPxData({
      token,
      requests: identifiers.map((identifier) => ({identifier})),
    })
      .then(({data}) => dispatch(pxDataDispatchers[PxDataDispatcherName.UPDATE_COMPLETE](data)));
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
  const dispatch = useDispatch();
  const identifier = usePxSlotIdentifier(slot);
  const requesting = React.useRef(false); // To debounce

  const token = data?.user?.token;
  const onCompletedRequest = () => requesting.current = false;

  const requestPxData = (offset: number) => {
    if (!identifier) {
      throw new Error(`Unique identifier for slot ${slot} is [null] while requesting older px data`);
    }
    if (requesting.current) {
      return;
    }
    if (!token) {
      throw new Error('Token unavailable - unable to request older Px data');
    }

    requesting.current = true;
    apiRequestPxData({
      token,
      requests: [{identifier, offset}],
    })
      .then(({data}) => dispatch(pxDataDispatchers[PxDataDispatcherName.UPDATE_COMPLETE](data)))
      .then(onCompletedRequest);
  };

  return {requestPxData};
};
