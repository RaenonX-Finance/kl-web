import React from 'react';

import {useSession} from 'next-auth/react';

import {useLayoutTypeConfigSelector} from '../../../state/config/selector';
import {getValidSlotNames} from '../../../state/config/utils';
import {errorDispatchers} from '../../../state/error/dispatchers';
import {ErrorDispatcherName} from '../../../state/error/types';
import {pxDataDispatchers} from '../../../state/pxData/dispatchers';
import {usePxSlotMap} from '../../../state/pxData/selector';
import {PxDataDispatcherName} from '../../../state/pxData/types';
import {useDispatch} from '../../../state/store';
import {apiInitPxData} from '../../../utils/api/px/data';
import {useHandleAxiosError} from '../../axios';


type UsePxInitHandlerReturn = {
  init: () => void,
};

export const usePxInitHandler = (): UsePxInitHandlerReturn => {
  const {data} = useSession();
  const layoutType = useLayoutTypeConfigSelector();
  const slotMap = usePxSlotMap();
  const dispatch = useDispatch();
  const {onError} = useHandleAxiosError();
  const token = data?.user.token;

  const init = React.useCallback(() => {
    if (!layoutType || !slotMap) {
      return;
    }
    if (!token) {
      throw new Error('Token unavailable - unable to initialize px data after layout change');
    }

    apiInitPxData({
      token,
      requests: [
        ...new Set(
          getValidSlotNames(layoutType)?.map((slotName) => slotMap[slotName]) ||
          Object.values(slotMap),
        ),
      ]
        .map((identifier) => ({identifier})),
      onRetryAttempt: () => dispatch(errorDispatchers[ErrorDispatcherName.UPDATE]({
        message: '初始報價資料要求連線逾時，重試中...',
      })),
      onRetrySuccess: () => dispatch(errorDispatchers[ErrorDispatcherName.HIDE_ERROR]()),
    })
      .then(({data}) => dispatch(pxDataDispatchers[PxDataDispatcherName.INIT](data)))
      .catch(onError);
  }, [layoutType, slotMap, token]);

  // Hooks
  React.useEffect(() => {
    init();
  }, [layoutType]);

  return {init};
};
