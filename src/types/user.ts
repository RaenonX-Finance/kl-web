import {LayoutType} from '../components/chart/layoutSelector/type';
import {PxChartLayoutConfig} from '../state/config/types';
import {PxDataSlotMap} from '../state/pxData/types';


/**
 * User config model returned from the backend.
 *
 * This should have the same schema as ``UserConfigModel`` from the backend.
 */
export type UserConfigModelOriginal = {
  account_id: string,
  slot_map: PxDataSlotMap,
  layout_config: PxChartLayoutConfig,
  layout_type: LayoutType,
};

/**
 * User config model actually used throughout the whole app.
 *
 * This does not have to have the same schema as ``UserConfigModel``.
 */
export type UserConfigModel = {
  accountId: string,
  slotMap: PxDataSlotMap,
  layoutConfig: PxChartLayoutConfig,
  layoutType: LayoutType,
};
