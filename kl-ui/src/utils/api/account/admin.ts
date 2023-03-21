import {AxiosResponse} from 'axios';
import {Permission} from 'kl-web-common/models/api/account/permission';
import {ISOTimestampWithTimezone} from 'kl-web-common/types/time';

import {AccountData, FuturesMarketClosedSession} from '../../../types/admin';
import {accountApiGet} from '../common/get';
import {accountApiPost} from '../common/post';
import {ApiRequestRequiresTokenOpts} from '../common/types';


type ApiGetAccountListOpts = ApiRequestRequiresTokenOpts;

export const apiGetAccountList = ({
  token,
}: ApiGetAccountListOpts): Promise<AxiosResponse<AccountData[]>> => (
  accountApiGet({
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
  accountApiPost({
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
  accountApiPost({
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
  accountApiPost({
    apiPath: '/admin/update-permissions',
    contentType: 'application/json',
    token,
    data: {id, add, remove},
  })
);

type ApiCreateMarketClosedSessionOpts = ApiRequestRequiresTokenOpts & Omit<FuturesMarketClosedSession, 'id'>;

export const apiCreateMarketClosedSession = ({
  token,
  security,
  start,
  end,
}: ApiCreateMarketClosedSessionOpts): Promise<AxiosResponse<FuturesMarketClosedSession[]>> => (
  accountApiPost({
    apiPath: '/admin/create-closed-session',
    contentType: 'application/json',
    token,
    data: {security, start, end},
  })
);

type ApiDeleteMarketClosedSessionOpts = ApiRequestRequiresTokenOpts & {
  session: string,
};

export const apiDeleteMarketClosedSession = ({
  token,
  session,
}: ApiDeleteMarketClosedSessionOpts): Promise<AxiosResponse<FuturesMarketClosedSession[]>> => (
  accountApiPost({
    apiPath: '/admin/delete-closed-session',
    contentType: 'application/json',
    token,
    data: {session},
  })
);

type ApiGetMarketClosedSessionsOpts = ApiRequestRequiresTokenOpts;

export const apiGetMarketClosedSessions = ({
  token,
}: ApiGetMarketClosedSessionsOpts): Promise<AxiosResponse<FuturesMarketClosedSession[]>> => (
  accountApiGet({
    apiPath: '/admin/get-closed-sessions',
    token,
  })
);
