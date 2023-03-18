import {PxHistorySingle} from 'kl-web-common/models/pxHistory';

import {mergePxDataBars} from './mergePxBars';
import {StateUpdateFuncOpts} from './stateUpdater';


export const pxDataStateUpdaterOnHistory = <T extends PxHistorySingle>({
  state,
  slotName,
  payload,
}: StateUpdateFuncOpts<T>) => {
  const originalData = state.data[slotName];
  const {data, identifier} = payload;

  if (!originalData) {
    console.warn(`Received px response to update the data of [${identifier}], but it's uninitialized`);
    return;
  }

  if (!data) {
    state.data[slotName] = null;
    return;
  }

  state.data[slotName] = {
    ...originalData,
    ...data,
    data: mergePxDataBars({
      newBars: data.data,
      original: state.data[slotName]?.data,
      noLastOverwrite: false,
    }),
  };
};
