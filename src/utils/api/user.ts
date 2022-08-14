import {AxiosResponse} from 'axios';

import {PxSharedConfig} from '../../components/chart/config/shared/type';
import {LayoutType} from '../../components/chart/layoutSelector/type';
import {PxLayoutConfig} from '../../state/config/type';
import {PxSlotMap} from '../../state/pxData/types';
import {ApiRequestRequiresTokenOpts, apiSendPostRequest} from './common';


/**
 * Key of this typing map must match `ConfigKey*` in the backend.
 */
type ApiUpdateConfigKeyDataMap = {
  slot_map: PxSlotMap,
  shared_config: PxSharedConfig,
  layout_config: PxLayoutConfig,
  layout_type: LayoutType,
};

export type ApiUpdateConfigKeys = keyof ApiUpdateConfigKeyDataMap;

export type ApiUpdateConfigOpts<K extends ApiUpdateConfigKeys> = ApiRequestRequiresTokenOpts & {
  key: K,
  data: ApiUpdateConfigKeyDataMap[K],
};

export const apiUpdateConfig = <K extends ApiUpdateConfigKeys>({
  token,
  key,
  data,
}: ApiUpdateConfigOpts<K>): Promise<AxiosResponse<ApiUpdateConfigKeyDataMap[K]>> => (
  apiSendPostRequest({
    apiPath: '/user/config/update',
    contentType: 'application/json',
    token,
    data: {key, data},
  })
);
