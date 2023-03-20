import {PxData} from 'kl-web-common/models/api/px/pxData';

import {StateUpdateFuncOpts} from './stateUpdater';


export const pxDataStateUpdaterOnInit = <T extends PxData>({
  state,
  slotName,
  payload,
}: StateUpdateFuncOpts<T>) => {
  state.data[slotName] = payload.data;
};
