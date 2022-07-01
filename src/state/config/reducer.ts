import {createSlice} from '@reduxjs/toolkit';

import {configDispatchers} from './dispatchers';
import {CONFIG_STATE_NAME, ConfigDispatcherName, ConfigState} from './types';
import {getInitialConfigSingle} from './utils';


const initialState: ConfigState = {
  layoutType: '1-1x1',
  layoutConfig: {
    A: getInitialConfigSingle(),
    B: getInitialConfigSingle(),
    C: getInitialConfigSingle(),
    D: getInitialConfigSingle(),
  },
};

const slice = createSlice({
  name: CONFIG_STATE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
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
