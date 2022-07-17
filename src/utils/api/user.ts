import {AxiosResponse} from 'axios';

import {LayoutType} from '../../components/chart/layoutSelector/type';
import {PxChartLayoutConfig} from '../../state/config/types';
import {PxDataSlotMap} from '../../state/pxData/types';
import {apiSendPostRequest} from './common';


/**
 * Key of this typing map must match ``ConfigKey*`` in the backend.
 */
type ApiUpdateConfigKeyDataMap = {
  slot_map: PxDataSlotMap,
  layout_config: PxChartLayoutConfig,
  layout_type: LayoutType,
};

type ApiUpdateConfigKeys = keyof ApiUpdateConfigKeyDataMap;

type ApiUpdateConfigOpts<K extends ApiUpdateConfigKeys> = {
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
    data: new URLSearchParams({
      key,
      data: JSON.stringify(data),
    }),
    token,
  })
);
