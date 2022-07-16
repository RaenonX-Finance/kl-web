import {createSlice} from '@reduxjs/toolkit';

import {PxData, PxDataFromSocket} from '../../types/pxData';
import {updatePxDataBar} from '../../utils/calc';
import {updateEpochSecToLocal} from '../../utils/time';
import {updateCurrentPxDataTitle} from '../../utils/title';
import {mergedDispatchers} from '../aggregated/dispatchers';
import {MergedDispatcherName} from '../aggregated/types';
import {pxDataDispatchers} from './dispatchers';
import {PX_DATA_STATE_NAME, PxDataDispatcherName, PxDataState, PxDataUpdateChartMap} from './types';


const initialState: PxDataState = {
  data: {
    'A': null,
    'B': null,
    'C': null,
    'D': null,
  },
  map: {
    'FITX@1': 'A',
    'NQ@1': 'B',
    'YM@1': 'C',
    'FITX@5': 'D',
  },
  mapReady: false,
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
  payload.forEach((pxData) => {
    const slot = state.map[pxData.uniqueIdentifier];

    if (!slot) {
      return;
    }

    state.data[slot] = fixPxData({
      ...pxData,
      lastUpdated: Date.now(),
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
    builder.addCase(pxDataDispatchers[PxDataDispatcherName.INIT], pxDataFillingReducer);
    builder.addCase(pxDataDispatchers[PxDataDispatcherName.UPDATE], pxDataFillingReducer);
    builder.addCase(
      mergedDispatchers[MergedDispatcherName.INIT_APP],
      (state: PxDataState, {payload}) => {
        const {config} = payload;

        state.map = config.slot_map;
        state.mapReady = true;
      },
    );
    builder.addCase(
      pxDataDispatchers[PxDataDispatcherName.UPDATE_MARKET],
      (state: PxDataState, {payload}) => {
        Object.values(state.data).map((pxData) => {
          if (!pxData) {
            return;
          }

          const latestMarket = payload[pxData.contract.symbol];

          if (!latestMarket) {
            return;
          }

          const lastBar = pxData.data.at(-1);

          if (!lastBar) {
            console.error(
              `Last data of the PxData ` +
              `(Contract: ${pxData.contract.symbol} / Period: ${pxData.periodSec} sec) undefined.`,
            );
            return;
          }

          pxData.data[pxData.data.length - 1] = updatePxDataBar(lastBar, latestMarket.close);
          pxData.latestMarket = latestMarket;
          pxData.lastUpdated = Date.now();
        });

        updateCurrentPxDataTitle(state.data);
      },
    );
    builder.addCase(
      pxDataDispatchers[PxDataDispatcherName.UPDATE_CHART_MAP],
      (state: PxDataState, {payload}: {payload: PxDataUpdateChartMap}) => {
        state.map = {
          ...state.map,
          ...Object.fromEntries(payload.map(({slot, uniqueIdentifier}) => [uniqueIdentifier, slot])),
        };
      },
    );
  },
});

export default slice.reducer;
