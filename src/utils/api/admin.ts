import {AxiosResponse} from 'axios';

import {AccountData} from '../../types/admin';
import {Permission} from '../../types/auth/user';
import {ISOTimestampWithTimezone} from '../../types/time';
import {ApiRequestRequiresTokenOpts, apiSendGetRequest, apiSendPostRequest} from './common';


type ApiGetAccountListOpts = ApiRequestRequiresTokenOpts;

export const apiGetAccountList = ({
  token,
}: ApiGetAccountListOpts): Promise<AxiosResponse<AccountData[]>> => (
  apiSendGetRequest({
    apiPath: '/admin/accounts',
    token,
  })
);

type ApiAdminOpts = ApiRequestRequiresTokenOpts & {
  id: string,
};

type ApiUpdateExpiryOpts = ApiAdminOpts & {
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
    data: {id, expiry},
  })
);

type ApiUpdateBlockedOpts = ApiAdminOpts & {
  blocked: boolean,
};

export const apiUpdateBlocked = ({
  token,
  id,
  blocked,
}: ApiUpdateBlockedOpts): Promise<AxiosResponse<AccountData>> => (
  apiSendPostRequest({
    apiPath: '/admin/update-blocked',
    contentType: 'application/json',
    token,
    data: {id, blocked},
  })
);

type ApiUpdatePermissionOpts = ApiAdminOpts & {
  add: Permission[],
  remove: Permission[],
};

export const apiUpdatePermissions = ({
  token,
  id,
  add,
  remove,
}: ApiUpdatePermissionOpts): Promise<AxiosResponse<AccountData>> => (
  apiSendPostRequest({
    apiPath: '/admin/update-permissions',
    contentType: 'application/json',
    token,
    data: {id, add, remove},
  })
);
