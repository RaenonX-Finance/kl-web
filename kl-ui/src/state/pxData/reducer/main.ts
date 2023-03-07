import {createSlice} from '@reduxjs/toolkit';

import {pxDataStateUpdater} from './stateUpdater';
import {pxDataStateUpdaterOnHistory} from './stateUpdaterOnHistory';
import {pxDataStateUpdaterOnInit} from './stateUpdaterOnInit';
import {PxDataMap, PxSlotName} from '../../../types/pxData';
import {mergedDispatchers} from '../../aggregated/dispatchers';
import {MergedDispatcherName} from '../../aggregated/types';
import {configDispatchers} from '../../config/dispatchers';
import {ConfigDispatcherName} from '../../config/type';
import {getValidSlotNames} from '../../config/utils';
import {pxDataDispatchers} from '../dispatchers';
import {PX_DATA_STATE_NAME, PxDataDispatcherName, PxDataState} from '../types';
import {generateInitialSlotMap} from '../utils';


const initialState: PxDataState = {
  data: {
    A: null,
    B: null,
    C: null,
    D: null,
  },
  map: null,
};

const slice = createSlice({
  name: PX_DATA_STATE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // New px bar to be added only from the backend
    // > Always use history data to add new bar - only update the last bar on market Px updated
    builder.addCase(mergedDispatchers[MergedDispatcherName.INIT_ACCOUNT], (state, {payload}) => {
      const {config} = payload;

      state.map = config.slot_map || generateInitialSlotMap();
    });
    builder.addCase(pxDataDispatchers[PxDataDispatcherName.INIT], (state, {payload}) => {
      pxDataStateUpdater({
        state,
        payload,
        fnUpdateState: pxDataStateUpdaterOnInit,
      });
    });
    builder.addCase(pxDataDispatchers[PxDataDispatcherName.UPDATE_COMPLETE].fulfilled, (state, {payload, meta}) => {
      pxDataStateUpdater({
        state,
        payload,
        validSlotNames: meta.validSlotNames,
        fnUpdateState: pxDataStateUpdaterOnHistory,
      });
    });
    builder.addCase(pxDataDispatchers[PxDataDispatcherName.UPDATE_MARKET].fulfilled, (state, {payload}) => ({
      ...state,
      data: payload,
    }));
    builder.addCase(pxDataDispatchers[PxDataDispatcherName.UPDATE_SLOT_MAP].fulfilled, (state, {payload}) => ({
      data: {
        ...state.data,
        // Need to set null to "reset" the chart
        // Otherwise, the chart will use the old data, then the update will cause errors
        [payload.payload]: null,
      },
      map: payload.data,
    }));
    builder.addCase(configDispatchers[ConfigDispatcherName.UPDATE_LAYOUT_TYPE].fulfilled, (state, {payload}) => {
      const validSlotNames = getValidSlotNames(payload.data);
      if (!validSlotNames) {
        return {...state};
      }

      return {
        ...state,
        data: {
          ...Object.fromEntries(Object.entries(state.data).map(([slotName, pxData]) => {
            if (validSlotNames.includes(slotName as PxSlotName)) {
              return [slotName, pxData];
            }

            return [slotName, null];
          })) as PxDataMap,
        },
      };
    });
  },
});

export default slice.reducer;
