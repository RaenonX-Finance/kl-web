import {createSlice} from '@reduxjs/toolkit';

import {PxData, PxDataFromSocket, PxSlotName} from '../../types/pxData';
import {updatePxDataBar} from '../../utils/calc';
import {updateEpochSecToLocal} from '../../utils/time';
import {updateCurrentPxDataTitle} from '../../utils/title';
import {mergedDispatchers} from '../aggregated/dispatchers';
import {MergedDispatcherName} from '../aggregated/types';
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

const fixPxData = (pxData: PxData): PxData => {
  pxData.data = pxData.data.map((item) => ({
    ...item,
    epochSec: updateEpochSecToLocal(item.epochSec),
    lastUpdated: Date.now(),
  }));

  return pxData;
};

const pxDataFillingReducer = (state: PxDataState, {payload}: {payload: PxDataFromSocket[]}) => {
  // TODO: To fix after data sending optimization
  if (!state.map) {
    console.error('Attempt to fill Px data while the px data map is not ready.', JSON.stringify(state));
    return;
  }

  Object.entries(state.map).forEach(([slot, identifier]) => {
    payload.forEach((pxData) => {
      if (identifier !== pxData.uniqueIdentifier) {
        return;
      }

      state.data[slot as PxSlotName] = fixPxData({
        ...pxData,
        lastUpdated: Date.now(),
      });
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
    builder.addCase(pxDataDispatchers[PxDataDispatcherName.INIT], pxDataFillingReducer);
    builder.addCase(pxDataDispatchers[PxDataDispatcherName.UPDATE_COMPLETE], pxDataFillingReducer);
    builder.addCase(pxDataDispatchers[PxDataDispatcherName.UPDATE_MARKET], (state, {payload}) => {
      Object.values(state.data).map((pxData) => {
        if (!pxData || payload.symbol !== pxData.contract.symbol) {
          return;
        }

        const lastBar = pxData.data.at(-1);

        if (!lastBar) {
          console.error(`Last data of the PxData ${pxData.contract.symbol} @ ${pxData.periodSec / 60} undefined.`);
          return;
        }

        pxData.data[pxData.data.length - 1] = updatePxDataBar(lastBar, payload.close);
        pxData.latestMarket = payload;
        pxData.lastUpdated = Date.now();
      });

      updateCurrentPxDataTitle(state.data);
    });
    builder.addCase(pxDataDispatchers[PxDataDispatcherName.UPDATE_SLOT_MAP].fulfilled, (state, {payload}) => ({
      data: {
        ...state.data,
        // Need to set null to "reset" the chart
        // Otherwise, the chart will use the old data, then the update will cause errors
        [payload.payload]: null,
      },
      map: payload.data,
    }));
  },
});

export default slice.reducer;
