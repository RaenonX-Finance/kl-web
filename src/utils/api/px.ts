import {AxiosResponse} from 'axios';

import {RequestPxMessageSingle} from '../../hooks/socket/px/type';
import {PxData, PxDataUniqueIdentifier} from '../../types/pxData';
import {ApiRequestRequiresTokenOpts, apiSendPostRequest} from './common';


type ApiInitPxDataOpts = ApiRequestRequiresTokenOpts & {
  identifiers: PxDataUniqueIdentifier[],
};

export const apiInitPxData = ({
  token,
  identifiers,
}: ApiInitPxDataOpts): Promise<AxiosResponse<PxData[]>> => (
  apiSendPostRequest({
    apiPath: '/px/init',
    data: {
      token,
      identifiers,
    },
    contentType: 'application/json',
  })
);

type ApiRequestPxDataOpts = ApiRequestRequiresTokenOpts & {
  requests: RequestPxMessageSingle[],
};

export const apiRequestPxData = ({
  token,
  requests,
}: ApiRequestPxDataOpts): Promise<AxiosResponse<PxData[]>> => (
  apiSendPostRequest({
    apiPath: '/px/request',
    data: {
      token,
      requests,
    },
    contentType: 'application/json',
  })
);
