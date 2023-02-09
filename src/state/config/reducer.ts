import {createSlice} from '@reduxjs/toolkit';

import {mergedDispatchers} from '../aggregated/dispatchers';
import {MergedDispatcherName} from '../aggregated/types';
import {configDispatchers} from './dispatchers';
import {CONFIG_STATE_NAME, ConfigDispatcherName, ConfigState} from './type';
import {generateLayoutConfig, generateSharedConfig} from './utils';


const initialState: ConfigState = {
  layoutType: null,
  layoutConfig: null,
  sharedConfig: null,
};

const slice = createSlice({
  name: CONFIG_STATE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      mergedDispatchers[MergedDispatcherName.INIT_APP],
      (state, {payload}) => {
        const {config} = payload;

        return {
          layoutType: config.layout_type || '1-1x1',
          layoutConfig: config.layout_config || generateLayoutConfig(),
          sharedConfig: config.shared_config || generateSharedConfig(),
        };
      },
    );
    builder.addCase(
      configDispatchers[ConfigDispatcherName.UPDATE_LAYOUT_TYPE].fulfilled,
      (state, {payload}) => ({
        ...state,
        layoutType: payload.data,
      }),
    );
    builder.addCase(
      configDispatchers[ConfigDispatcherName.UPDATE_LAYOUT_CONFIG].fulfilled,
      (state, {payload}) => ({
        ...state,
        layoutConfig: payload.data,
      }),
    );
    builder.addCase(
      configDispatchers[ConfigDispatcherName.UPDATE_SHARED_CONFIG].fulfilled,
      (state, {payload}) => ({
        ...state,
        sharedConfig: payload.data,
      }),
    );
  },
});

export default slice.reducer;
