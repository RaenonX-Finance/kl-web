import {createAction, createAsyncThunk} from '@reduxjs/toolkit';

import {PxDataFromSocket, PxDataMap, PxSlotName} from '../../types/pxData';
import {PxDataMarket} from '../../types/pxDataMarket';
import {updatePxDataBar} from '../../utils/calc';
import {overrideObject} from '../../utils/override';
import {updateCurrentPxDataTitle} from '../../utils/title';
import {createConfigAsyncThunk} from '../config/utils';
import {ReduxState} from '../types';
import {onAsyncThunkError} from '../utils';
import {PxDataDispatcherName, PxSlotMapUpdatePayload} from './types';
import {generateInitialSlotMap, isMarketPxUpdateOk} from './utils';


export const pxDataDispatchers = {
  [PxDataDispatcherName.INIT]: createAction<PxDataFromSocket[]>(PxDataDispatcherName.INIT),
  [PxDataDispatcherName.UPDATE_COMPLETE]: createAction<PxDataFromSocket[]>(PxDataDispatcherName.UPDATE_COMPLETE),
  [PxDataDispatcherName.UPDATE_MARKET]: createAsyncThunk<
    PxDataMap,
    PxDataMarket,
    {state: ReduxState, rejectValue: string}
  >(
    PxDataDispatcherName.UPDATE_MARKET,
    async (payload, {getState, dispatch, rejectWithValue}) => {
      const {config, pxData} = getState();
      const {layoutConfig} = config;

      for (const [slotStr, pxDataInSlot] of Object.entries(pxData.data)) {
        const slot = slotStr as PxSlotName;

        if (
          // Check if `pxData` of a slot is set
          !pxDataInSlot ||
          // Check if the `pxData` in slot is has the matching security symbol
          payload.symbol !== pxDataInSlot.contract.symbol ||
          // Check if it's OK to update
          isMarketPxUpdateOk(layoutConfig, pxDataInSlot, slot)
        ) {
          continue;
        }

        const lastBar = pxDataInSlot.data.at(-1);

        if (!lastBar) {
          return onAsyncThunkError({
            message: (
              `Last data of the PxData ${pxDataInSlot.contract.symbol} @ ${pxDataInSlot.periodSec / 60} undefined.`
            ),
            data: pxDataInSlot,
            rejectWithValue,
            dispatch,
          });
        }

        pxDataInSlot.data[pxDataInSlot.data.length - 1] = updatePxDataBar(lastBar, payload.close);
        pxDataInSlot.latestMarket = payload;
        pxDataInSlot.lastUpdated = Date.now();
      }

      updateCurrentPxDataTitle(pxData.data);

      return pxData.data;
    },
  ),
  [PxDataDispatcherName.UPDATE_SLOT_MAP]: createConfigAsyncThunk<
    PxSlotMapUpdatePayload,
    'slot_map',
    PxSlotName
  >({
    actionName: PxDataDispatcherName.UPDATE_SLOT_MAP,
    key: 'slot_map',
    getData: ({pxData}, {slot, symbol, periodMin}) => overrideObject(
      pxData.map || generateInitialSlotMap(),
      {[slot]: `${symbol}@${periodMin}`},
    ),
    getPayload: ({slot}) => slot,
  }),
};
