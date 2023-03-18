import {AxiosResponse} from 'axios';
import {ApiPath} from 'kl-web-common/enums/endpoints';
import {PxHistory} from 'kl-web-common/models/pxHistory';
import {PxInitApi} from 'kl-web-common/models/pxInit';
import {PxRequestBodyModel} from 'kl-web-common/models/pxRequest';

import {dataApiPost} from './common/post';


type ApiRequestPxDataOpts = PxRequestBodyModel;

export const apiRequestPxData = ({
  token,
  requests,
}: ApiRequestPxDataOpts): Promise<AxiosResponse<PxHistory>> => (
  dataApiPost({
    apiPath: ApiPath.PxRequest,
    data: {
      token,
      requests,
    },
    contentType: 'application/json',
  })
);

export const apiInitPxData = ({
  token,
  requests,
}: ApiRequestPxDataOpts): Promise<AxiosResponse<PxInitApi>> => (
  dataApiPost({
    apiPath: ApiPath.PxInit,
    data: {
      token,
      requests,
    },
    contentType: 'application/json',
  })
);
