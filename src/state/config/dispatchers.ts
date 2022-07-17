import {ConfigDispatcherName, LayoutConfigUpdatePayload, LayoutTypeUpdatePayload} from './types';
import {createConfigAsyncThunk} from './utils';


export const configDispatchers = {
  [ConfigDispatcherName.UPDATE_LAYOUT_TYPE]: createConfigAsyncThunk<
    LayoutTypeUpdatePayload,
    'layout_type'
  >({
    actionName: ConfigDispatcherName.UPDATE_LAYOUT_TYPE,
    key: 'layout_type',
    getData: ({config}) => config.layoutType,
    getToken: ({token}) => token,
  }),
  [ConfigDispatcherName.UPDATE_LAYOUT_CONFIG]: createConfigAsyncThunk<
    LayoutConfigUpdatePayload,
    'layout_config'
  >({
    actionName: ConfigDispatcherName.UPDATE_LAYOUT_CONFIG,
    key: 'layout_config',
    getData: ({config}) => config.layoutConfig,
    getToken: ({token}) => token,
  }),
};
