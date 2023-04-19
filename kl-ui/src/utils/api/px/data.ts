import {AxiosResponse} from 'axios';
import {PxApiPath} from 'kl-web-common/enums/endpoints';
import {PxHistory} from 'kl-web-common/models/api/px/pxHistory';
import {PxInitApi} from 'kl-web-common/models/api/px/pxInit';
import {PxRequestBodyModel} from 'kl-web-common/models/api/px/pxRequest';

import {pxApiPost} from '../common/post';
import {ApiRetryableRequestOpts} from '../common/types';


type ApiRequestPxDataOpts = PxRequestBodyModel;

export const apiRequestPxData = ({
  token,
  requests,
}: ApiRequestPxDataOpts): Promise<AxiosResponse<PxHistory>> => (
  pxApiPost({
    apiPath: PxApiPath.PxRequest,
    data: {
      token,
      requests,
    },
    contentType: 'application/json',
  })
);

type ApiInitPxDataOpts = ApiRequestPxDataOpts & ApiRetryableRequestOpts;

export const apiInitPxData = ({
  token,
  requests,
  onRetryAttempt,
  onRetrySuccess,
}: ApiInitPxDataOpts): Promise<AxiosResponse<PxInitApi>> => (
  pxApiPost({
    apiPath: PxApiPath.PxInit,
    data: {
      token,
      requests,
    },
    contentType: 'application/json',
    onRetryAttempt,
    onRetrySuccess,
  })
);
