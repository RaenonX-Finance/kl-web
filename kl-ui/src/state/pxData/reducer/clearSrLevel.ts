import {PxSlotName} from '../../../types/pxData';
import {PxDataState} from '../types';


export const pxSrLevelClearer = (state: PxDataState, symbols: string[]) => {
  Object.entries(state.data).forEach(([slot, data]) => {
    if (!data) {
      return;
    }

    if (!symbols.includes(data.contract.symbol)) {
      return;
    }

    state.data[slot as PxSlotName] = {
      ...data,
      // SR levels have 5 groups
      supportResistance: [[], [], [], [], []],
    };
  });
};
