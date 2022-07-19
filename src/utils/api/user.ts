import {AxiosResponse} from 'axios';

import {LayoutType} from '../../components/chart/layoutSelector/type';
import {PxChartLayoutConfig} from '../../state/config/type';
import {PxSlotMap} from '../../state/pxData/types';
import {apiSendPostRequest} from './common';


/**
 * Key of this typing map must match `ConfigKey*` in the backend.
 */
type ApiUpdateConfigKeyDataMap = {
  slot_map: PxSlotMap,
  layout_config: PxChartLayoutConfig,
  layout_type: LayoutType,
};

export type ApiUpdateConfigKeys = keyof ApiUpdateConfigKeyDataMap;

export type ApiUpdateConfigOpts<K extends ApiUpdateConfigKeys> = {
  token: string,
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
    data: {
      key,
      data,
    },
  })
);
