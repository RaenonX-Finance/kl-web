import {AxiosResponse} from 'axios';
import {InfoApiPath} from 'kl-web-common/enums/endpoints';
import {OptionsOiData, OptionsOiRequest} from 'kl-web-common/models/api/info/optionsOi';

import {infoApiGet} from '../common/get';
import {ApiRequestRequiresTokenOpts, ApiRetryableRequestOpts} from '../common/types';


type ApiGetOptionsOiOpts = ApiRequestRequiresTokenOpts & OptionsOiRequest & ApiRetryableRequestOpts;

export const apiGetOptionsOi = ({
  token,
  onRetryAttempt,
  onRetrySuccess,
  ...params
}: ApiGetOptionsOiOpts): Promise<AxiosResponse<OptionsOiData>> => (
  infoApiGet({
    apiPath: InfoApiPath.OptionsOi,
    token,
    onRetryAttempt,
    onRetrySuccess,
    params,
  })
);
