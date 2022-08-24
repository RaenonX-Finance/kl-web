import {createSlice} from '@reduxjs/toolkit';

import {PxData, PxDataMap, PxSlotName} from '../../types/pxData';
import {mergeThenSort} from '../../utils/arr';
import {updateEpochSecToLocal} from '../../utils/time';
import {updateCurrentPxDataTitle} from '../../utils/title';
import {mergedDispatchers} from '../aggregated/dispatchers';
import {MergedDispatcherName} from '../aggregated/types';
import {configDispatchers} from '../config/dispatchers';
import {ConfigDispatcherName} from '../config/type';
import {getValidSlotNames} from '../config/utils';
import {pxDataDispatchers} from './dispatchers';
import {PX_DATA_STATE_NAME, PxDataDispatcherName, PxDataState} from './types';
import {generateInitialSlotMap} from './utils';


const initialState: PxDataState = {
  data: {
    A: null,
    B: null,
    C: null,
    D: null,
  },
  map: null,
};

const applyTimezoneOffsetOnBars = (pxData: PxData): PxData => ({
  ...pxData,
  data: pxData.data.map((item) => ({
    ...item,
    epochSec: updateEpochSecToLocal(item.epochSec),
  })),
});

const mergePxData = (newPxData: PxData, original: PxData | null): PxData => ({
  ...newPxData,
  data: mergeThenSort(
    original?.data || [],
    newPxData.data,
    ({epochSec}) => epochSec,
  ),
});

const pxDataFillingReducer = (state: PxDataState, payload: PxData[], validSlotNames?: PxSlotName[]) => {
  if (!state.map) {
    console.error('Attempt to fill Px data while the px data map is not ready.', JSON.stringify(state));
    return;
  }

  Object.entries(state.map).forEach(([slot, identifier]) => {
    payload.map(applyTimezoneOffsetOnBars).forEach((pxData) => {
      if (identifier !== pxData.uniqueIdentifier) {
        return;
      }

      const slotName = slot as PxSlotName;

      if (
        // If `validSlotNames` is provided, check if the current slot name is valid
        (validSlotNames && !validSlotNames.includes(slotName)) ||
        // Px data to fill has to match the desired unique identifier
        (state.map && state.map[slotName] !== pxData.uniqueIdentifier)
      ) {
        return;
      }

      state.data[slotName] = mergePxData(pxData, state.data[slotName]);
    });
  });

  updateCurrentPxDataTitle(state.data);
};

const slice = createSlice({
  name: PX_DATA_STATE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // New px bar to be added only from the backend
    // > Always use history data to add new bar - only update the last bar on market Px updated
    builder.addCase(mergedDispatchers[MergedDispatcherName.INIT_APP], (state, {payload}) => {
      const {config} = payload;

      state.map = config.slot_map || generateInitialSlotMap();
    });
    builder.addCase(pxDataDispatchers[PxDataDispatcherName.INIT], (state, {payload}) => {
      pxDataFillingReducer(state, payload);
    });
    builder.addCase(pxDataDispatchers[PxDataDispatcherName.UPDATE_COMPLETE].fulfilled, (state, {payload, meta}) => {
      pxDataFillingReducer(state, payload, meta.validSlotNames);
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
