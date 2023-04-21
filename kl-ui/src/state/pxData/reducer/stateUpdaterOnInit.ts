import {PxDataInit} from 'kl-web-common/models/api/px/pxData';

import {StateUpdateFuncOpts} from './stateUpdater';


export const pxDataStateUpdaterOnInit = <T extends PxDataInit>({
  state,
  slotName,
  payload,
}: StateUpdateFuncOpts<T>) => {
  const data = payload.data;

  if (data === null) {
    state.data[slotName] = null;
    return;
  }

  state.data[slotName] = {
    ...data,
    latestMarket: null,
  };
};
