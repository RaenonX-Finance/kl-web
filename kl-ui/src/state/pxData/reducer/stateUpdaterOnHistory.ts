import {PxHistorySingle} from 'kl-web-common/models/api/px/pxHistory';

import {mergePxDataBars} from './mergePxBars';
import {StateUpdateFuncOpts} from './stateUpdater';


export const pxDataStateUpdaterOnHistory = <T extends PxHistorySingle>({
  state,
  slotName,
  payload,
}: StateUpdateFuncOpts<T>) => {
  const dataInState = state.data[slotName];
  const {data, identifier} = payload;

  if (!dataInState) {
    console.warn(`Received px response to update the data of [${identifier}], but it's uninitialized`);
    return;
  }

  if (!data) {
    state.data[slotName] = null;
    return;
  }

  const lastInState = dataInState.data.at(-1);

  if (!lastInState) {
    return;
  }

  state.data[slotName] = {
    ...dataInState,
    ...data,
    data: mergePxDataBars({
      newBars: data.data,
      original: state.data[slotName]?.data,
      lastInState,
    }),
  };
};
