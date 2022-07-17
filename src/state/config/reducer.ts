import {createSlice} from '@reduxjs/toolkit';

import {apiUpdateConfig} from '../../utils/api/user';
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
        const {layoutType, token} = payload;

        if (!token) {
          console.error(`Layout type cannot update - token is falsy: ${token}`, JSON.stringify(state));
          return;
        }

        state.layoutType = layoutType;
        apiUpdateConfig({token, key: 'layout_type', data: state.layoutType})
          .catch(console.error);
      },
    );
    builder.addCase(
      configDispatchers[ConfigDispatcherName.UPDATE_LAYOUT_CONFIG],
      (state: ConfigState, {payload}) => {
        const {token: token, slot, configKey, value} = payload;

        if (!state.layoutConfig) {
          console.error('Attempt to update the layout config while the config is not ready.', JSON.stringify(state));
          return;
        } else if (!token) {
          console.error(`Layout config cannot update - token is falsy: ${token}`, JSON.stringify(state));
          return;
        }

        state.layoutConfig[slot][configKey] = value;
        apiUpdateConfig({token, key: 'layout_config', data: state.layoutConfig})
          .catch(console.error);
      },
    );
  },
});

export default slice.reducer;
