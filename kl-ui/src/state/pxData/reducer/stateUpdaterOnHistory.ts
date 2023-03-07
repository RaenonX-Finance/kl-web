import {PxHistorySingle} from 'kl-web-common/models/pxHistory';

import {mergePxDataBars} from './mergePxBars';
import {StateUpdateFuncOpts} from './stateUpdater';


export const pxDataStateUpdaterOnHistory = <T extends PxHistorySingle>({
  state,
  slotName,
  identifier,
  response,
}: StateUpdateFuncOpts<T>) => {
  const originalData = state.data[slotName];
  if (!originalData) {
    console.warn(`Received px response to update the data of [${identifier}], but it's uninitialized`);
    return;
  }

  state.data[slotName] = {
    ...originalData,
    ...response,
    data: mergePxDataBars({
      newBars: response.data,
      original: state.data[slotName]?.data,
      noLastOverwrite: false,
    }),
  };
};
