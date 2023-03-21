import {AxiosResponse} from 'axios';
import {PxApiPath} from 'kl-web-common/enums/endpoints';
import {PxHistory} from 'kl-web-common/models/api/px/pxHistory';
import {PxInitApi} from 'kl-web-common/models/api/px/pxInit';
import {PxRequestBodyModel} from 'kl-web-common/models/api/px/pxRequest';

import {pxApiPost} from '../common/post';


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

export const apiInitPxData = ({
  token,
  requests,
}: ApiRequestPxDataOpts): Promise<AxiosResponse<PxInitApi>> => (
  pxApiPost({
    apiPath: PxApiPath.PxInit,
    data: {
      token,
      requests,
    },
    contentType: 'application/json',
  })
);
