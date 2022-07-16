import {createSlice} from '@reduxjs/toolkit';

import {aggregatedDispatchers} from '../aggregated/dispatchers';
import {AggregatedDispatcherName} from '../aggregated/types';
import {configDispatchers} from './dispatchers';
import {CONFIG_STATE_NAME, ConfigDispatcherName, ConfigState} from './types';
import {getInitialConfigSingle} from './utils';


const initialState: ConfigState = {
  // Values doesn't really matter here as `isReady` should block the UI from render
  layoutType: '1-1x1',
  layoutConfig: {
    A: getInitialConfigSingle(),
    B: getInitialConfigSingle(),
    C: getInitialConfigSingle(),
    D: getInitialConfigSingle(),
  },
  isReady: false,
};

const slice = createSlice({
  name: CONFIG_STATE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      aggregatedDispatchers[AggregatedDispatcherName.INIT_CONFIG],
      (state: ConfigState, {payload}) => {
        const {layoutType, layoutConfig} = payload;

        return {
          ...state,
          layoutType,
          layoutConfig,
          isReady: true,
        };
      },
    );
    builder.addCase(
      configDispatchers[ConfigDispatcherName.UPDATE_LAYOUT],
      (state: ConfigState, {payload}) => {
        state.layoutType = payload;
      },
    );
    builder.addCase(
      configDispatchers[ConfigDispatcherName.UPDATE_LAYOUT_CONFIG],
      (state: ConfigState, {payload}) => {
        const {slot, configKey, value} = payload;
        state.layoutConfig[slot][configKey] = value;
      },
    );
  },
});

export default slice.reducer;
