import {LayoutType} from '../components/chart/layoutSelector/type';
import {PxLayoutConfig} from '../state/config/type';
import {PxSlotMap} from '../state/pxData/types';


/**
 * User config model returned from the backend.
 *
 * This should have the same schema as `UserConfigModel` from the backend.
 */
export type UserConfigModel = {
  account_id: string,
  slot_map: PxSlotMap | null,
  layout_config: PxLayoutConfig | null,
  layout_type: LayoutType | null,
};
