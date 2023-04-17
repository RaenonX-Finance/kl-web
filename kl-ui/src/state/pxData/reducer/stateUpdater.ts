import {PxHistorySingle} from 'kl-web-common/models/api/px/pxHistory';

import {applyTimezoneOffsetOnBars} from './timezoneOffset';
import {PxStateUpdatePayload} from './type';
import {PxSlotName} from '../../../types/pxData';
import {updateCurrentPxDataTitle} from '../../../utils/title';
import {PxDataState} from '../types';


export type StateUpdateFuncOpts<T extends PxHistorySingle> = {
  state: PxDataState,
  slotName: PxSlotName,
  payload: PxStateUpdatePayload<T>,
};

type PxDataStateUpdaterOpts<T extends PxHistorySingle> = {
  state: PxDataState,
  validSlotNames?: PxSlotName[],
  payload: StateUpdateFuncOpts<T>['payload'][],
  fnUpdateState: (opts: StateUpdateFuncOpts<T>) => void,
};

export const pxDataStateUpdater = <T extends PxHistorySingle>({
  state,
  payload,
  validSlotNames,
  fnUpdateState,
}: PxDataStateUpdaterOpts<T>) => {
  if (!state.map) {
    console.error('Attempt to fill Px data while the px data map is not ready.', JSON.stringify(state));
    return;
  }

  Object.entries(state.map).forEach(([slot, identifierOfMap]) => {
    payload.map(applyTimezoneOffsetOnBars).forEach((singlePayload) => {
      const {identifier} = singlePayload;

      if (identifierOfMap !== identifier) {
        return;
      }

      const slotName = slot as PxSlotName;

      if (
        // If `validSlotNames` is provided, check if the current slot name is valid
        (validSlotNames && !validSlotNames.includes(slotName)) ||
        // Px data to fill has to match the desired unique identifier
        (state.map && state.map[slotName] !== identifier)
      ) {
        return;
      }

      fnUpdateState({
        state,
        slotName,
        payload: singlePayload,
      });
    });
  });

  updateCurrentPxDataTitle(state.data);
};
