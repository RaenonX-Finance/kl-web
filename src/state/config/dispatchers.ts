import {overrideObject} from '../../utils/override';
import {ConfigDispatcherName, LayoutConfigUpdatePayload, LayoutTypeUpdatePayload} from './type';
import {createConfigAsyncThunk, generateInitialConfig} from './utils';


export const configDispatchers = {
  [ConfigDispatcherName.UPDATE_LAYOUT_TYPE]: createConfigAsyncThunk<
    LayoutTypeUpdatePayload,
    'layout_type'
  >({
    actionName: ConfigDispatcherName.UPDATE_LAYOUT_TYPE,
    key: 'layout_type',
    getData: (_, {layoutType}) => layoutType,
    getPayload: () => null,
  }),
  [ConfigDispatcherName.UPDATE_LAYOUT_CONFIG]: createConfigAsyncThunk<
    LayoutConfigUpdatePayload,
    'layout_config'
  >({
    actionName: ConfigDispatcherName.UPDATE_LAYOUT_CONFIG,
    key: 'layout_config',
    getData: ({config}, {slot, configKey, value}) => overrideObject(
      config.layoutConfig || generateInitialConfig(),
      {[slot]: {[configKey]: value}},
    ),
    getPayload: () => null,
  }),
};
