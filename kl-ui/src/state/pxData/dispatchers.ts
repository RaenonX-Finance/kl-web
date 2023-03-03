import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import {PxHistory} from 'kl-web-common/models/pxHistory';
import {PxInit} from 'kl-web-common/models/pxInit';
import {PxMarket} from 'kl-web-common/models/pxMarket';

import {PxCompleteUpdateMeta, PxDataDispatcherName, PxMarketUpdateMeta, PxSlotMapUpdatePayload} from './types';
import {generateInitialSlotMap, isMarketPxUpdateOk} from './utils';
import {PxDataMap, PxSlotName} from '../../types/pxData';
import {updatePxDataBar} from '../../utils/calc';
import {overrideObject} from '../../utils/override';
import {updateCurrentPxDataTitle} from '../../utils/title';
import {createConfigAsyncThunk, getValidSlotNames} from '../config/utils';
import {ReduxState} from '../types';
import {onAsyncThunkError} from '../utils';


export const pxDataDispatchers = {
  [PxDataDispatcherName.INIT]: createAction<PxInit>(PxDataDispatcherName.INIT),
  [PxDataDispatcherName.UPDATE_COMPLETE]: createAsyncThunk<
    PxHistory,
    PxHistory,
    {state: ReduxState, rejectValue: string, fulfilledMeta: PxCompleteUpdateMeta}
  >(
    PxDataDispatcherName.UPDATE_COMPLETE,
    async (payload, {getState, dispatch, rejectWithValue, fulfillWithValue}) => {
      const {config} = getState();
      const validSlotNames = getValidSlotNames(config.layoutType);

      if (!validSlotNames) {
        return onAsyncThunkError({
          message: `No valid slot names of layout type [${config.layoutType}]`,
          data: null,
          rejectWithValue,
          dispatch,
        });
      }

      return fulfillWithValue(payload, {validSlotNames});
    },
  ),
  [PxDataDispatcherName.UPDATE_MARKET]: createAsyncThunk<
    PxDataMap,
    PxMarket,
    {state: ReduxState, rejectValue: string, fulfilledMeta: PxMarketUpdateMeta}
  >(
    PxDataDispatcherName.UPDATE_MARKET,
    async (payload, {getState, dispatch, rejectWithValue, fulfillWithValue}) => {
      const {config, data, pxData} = getState();
      const {sharedConfig} = config;

      if (!sharedConfig) {
        return onAsyncThunkError({
          message: `Attempt to update market data while the shared config is not ready.`,
          data: null,
          rejectWithValue,
          dispatch,
        });
      }

      const pxDataMap: PxDataMap = {
        A: null,
        B: null,
        C: null,
        D: null,
      };

      for (const slotStr of Object.keys(pxData.data)) {
        const slot = slotStr as PxSlotName;
        const pxDataInSlot = pxData.data[slot];
        const lastBar = pxDataInSlot?.data.at(-1);
        const latestMarket = pxDataInSlot ? payload[pxDataInSlot.contract.symbol] : undefined;

        if (!pxDataInSlot) {
          pxDataMap[slot] = null;
          continue;
        }

        if (
          // Check if the `pxData` is potentially update-able
          !latestMarket ||
          // Check if the `pxData` in slot is has the matching security symbol
          !payload.hasOwnProperty(pxDataInSlot.contract.symbol) ||
          // Check if it's OK to update
          !isMarketPxUpdateOk({
            sharedConfig,
            lastUpdated: data.lastPxUpdate[pxDataInSlot.contract.symbol],
            lastBar,
            last: latestMarket.c,
          })
        ) {
          pxDataMap[slot] = {...pxDataInSlot};
          continue;
        }
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

        pxDataMap[slot] = {
          ...pxDataInSlot,
          data: pxDataInSlot.data.slice(0, -1).concat([updatePxDataBar(lastBar, latestMarket.c)]),
          latestMarket,
        };
      }

      updateCurrentPxDataTitle(pxData.data);

      return fulfillWithValue(pxDataMap, {securities: Object.keys(payload)});
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