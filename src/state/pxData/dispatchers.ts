import {createAction} from '@reduxjs/toolkit';

import {PxDataFromSocket} from '../../types/pxData';
import {PxDataMarket} from '../../types/pxDataMarket';
import {createConfigAsyncThunk} from '../config/utils';
import {PxDataDispatcherName, PxSlotMapUpdatePayload} from './types';
import {generateInitialSlotMap} from './utils';


export const pxDataDispatchers = {
  [PxDataDispatcherName.INIT]: createAction<PxDataFromSocket[]>(PxDataDispatcherName.INIT),
  [PxDataDispatcherName.UPDATE_COMPLETE]: createAction<PxDataFromSocket[]>(PxDataDispatcherName.UPDATE_COMPLETE),
  [PxDataDispatcherName.UPDATE_MARKET]: createAction<PxDataMarket>(PxDataDispatcherName.UPDATE_MARKET),
  [PxDataDispatcherName.UPDATE_SLOT_MAP]: createConfigAsyncThunk<
    PxSlotMapUpdatePayload,
    'slot_map'
  >({
    actionName: PxDataDispatcherName.UPDATE_SLOT_MAP,
    key: 'slot_map',
    getData: ({pxData}, {slot, symbol, periodMin}) => (
      Object.fromEntries(Object.entries(pxData.map || generateInitialSlotMap())
        .filter(([_, mapSlot]) => slot !== mapSlot)
        .concat([[`${symbol}@${periodMin}`, slot]]))
    ),
  }),
};
