import {LayoutType} from '../components/chart/layoutSelector/type';
import {PxChartLayoutConfig} from '../state/config/types';
import {PxDataSlotMap} from '../state/pxData/types';


/**
 * User config model returned from the backend.
 *
 * This should have the same schema as ``UserConfigModel`` from the backend.
 */
export type UserConfigModel = {
  account_id: string,
  slot_map: PxDataSlotMap | null,
  layout_config: PxChartLayoutConfig | null,
  layout_type: LayoutType | null,
};
