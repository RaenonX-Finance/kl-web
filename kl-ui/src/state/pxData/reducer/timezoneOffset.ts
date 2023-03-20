import {PxHistorySingle} from 'kl-web-common/models/api/px/pxHistory';

import {StateUpdateFuncOpts} from './stateUpdater';
import {updateEpochSecToLocal} from '../../../utils/time';


export const applyTimezoneOffsetOnBars = <T extends PxHistorySingle>(
  payload: StateUpdateFuncOpts<T>['payload'],
): StateUpdateFuncOpts<T>['payload'] => {
  if (!payload.data) {
    return {
      ...payload,
      data: null,
    };
  }

  const pxDataBars = payload.data.data;

  return {
    ...payload,
    data: {
      ...payload.data,
      data: pxDataBars.map((item) => ({
        ...item,
        epochSecond: updateEpochSecToLocal(item.epochSecond),
      })),
    },
  };
};
