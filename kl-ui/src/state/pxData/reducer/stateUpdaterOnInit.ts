import {PxData} from 'kl-web-common/models/pxData';

import {StateUpdateFuncOpts} from './stateUpdater';


export const pxDataStateUpdaterOnInit = <T extends PxData>({
  state,
  slotName,
  response,
}: StateUpdateFuncOpts<T>) => {
  state.data[slotName] = response;
};
