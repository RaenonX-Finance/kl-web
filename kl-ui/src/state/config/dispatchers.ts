import {
  ConfigDispatcherName,
  LayoutConfigUpdatePayload,
  LayoutTypeUpdatePayload,
  SharedConfigUpdatePayload,
} from './type';
import {createConfigAsyncThunk, generateLayoutConfig} from './utils';
import {overrideObject} from '../../utils/override';


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
      config.layoutConfig || generateLayoutConfig(),
      {[slot]: {[configKey]: value}},
    ),
    getPayload: () => null,
  }),
  [ConfigDispatcherName.UPDATE_SHARED_CONFIG]: createConfigAsyncThunk<
    SharedConfigUpdatePayload,
    'shared_config'
    >({
      actionName: ConfigDispatcherName.UPDATE_SHARED_CONFIG,
      key: 'shared_config',
      getData: (_, {updated}) => updated,
      getPayload: () => null,
    }),
};
