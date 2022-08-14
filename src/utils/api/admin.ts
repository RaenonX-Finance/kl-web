import {AxiosResponse} from 'axios';

import {AccountData} from '../../types/admin';
import {ISOTimestampWithTimezone} from '../../types/time';
import {apiSendGetRequest, apiSendPostRequest} from './common';


export type ApiGetAccountListOpts = {
  token: string,
};

export const apiGetAccountList = ({
  token,
}: ApiGetAccountListOpts): Promise<AxiosResponse<AccountData[]>> => (
  apiSendGetRequest({
    apiPath: '/admin/accounts',
    token,
  })
);

export type ApiUpdateExpiryOpts = {
  token: string,
  id: string,
  expiry: ISOTimestampWithTimezone | null,
};

export const apiUpdateExpiry = ({
  token,
  id,
  expiry,
}: ApiUpdateExpiryOpts): Promise<AxiosResponse<AccountData>> => (
  apiSendPostRequest({
    apiPath: '/admin/update-expiry',
    contentType: 'application/json',
    token,
    data: {
      id,
      expiry,
    },
  })
);
