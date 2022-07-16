import {createSlice} from '@reduxjs/toolkit';

import {mergedDispatchers} from '../aggregated/dispatchers';
import {MergedDispatcherName} from '../aggregated/types';
import {configDispatchers} from './dispatchers';
import {CONFIG_STATE_NAME, ConfigDispatcherName, ConfigState} from './types';
import {generateInitialConfig} from './utils';


const initialState: ConfigState = {
  layoutType: null,
  layoutConfig: null,
};

const slice = createSlice({
  name: CONFIG_STATE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      mergedDispatchers[MergedDispatcherName.INIT_APP],
      (state: ConfigState, {payload}) => {
        const {config} = payload;

        return {
          layoutType: config.layout_type || '4-2x2',
          layoutConfig: config.layout_config || generateInitialConfig(),
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
        if (!state.layoutConfig) {
          console.error('Attempt to update the layout config while the config is not ready.', JSON.stringify(state));
          return;
        }

        const {slot, configKey, value} = payload;
        state.layoutConfig[slot][configKey] = value;
      },
    );
  },
});

export default slice.reducer;
