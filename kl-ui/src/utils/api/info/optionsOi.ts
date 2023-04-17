import {AxiosResponse} from 'axios';
import {InfoApiPath} from 'kl-web-common/enums/endpoints';
import {OptionsOiData, OptionsOiRequest} from 'kl-web-common/models/api/info/optionsOi';

import {infoApiGet} from '../common/get';
import {ApiRequestRequiresTokenOpts} from '../common/types';


type ApiGetOptionsOiOpts = ApiRequestRequiresTokenOpts & OptionsOiRequest;

export const apiGetOptionsOi = ({
  token,
  ...params
}: ApiGetOptionsOiOpts): Promise<AxiosResponse<OptionsOiData>> => (
  infoApiGet({
    apiPath: InfoApiPath.OptionsOi,
    token,
    params,
  })
);
