import {AxiosResponse} from 'axios';
import * as env from 'env-var';

import {CUSTOM_PROVIDER_ID} from '../../../types/auth/const';
import {OAuth2TokenResponse} from '../../../types/auth/oauth';
import {SignupKeyModel, UserModelOriginal} from '../../../types/auth/user';
import {accountApiPost} from '../common/post';
import {ApiRequestRequiresTokenOpts} from '../common/types';


export const apiGetNextAuthCallbackUrl = (accessToken: string): string => {
  const url = new URL(`${process.env.NEXT_PUBLIC_HOST_URL}/api/auth/callback/${CUSTOM_PROVIDER_ID}`);
  url.search = window.location.search;
  // Key name must be `access_token`
  url.searchParams.set('access_token', accessToken);

  return url.toString();
};

type ApiRequestOAuth2TokenOpts = {
  username: string,
  password: string,
};

export const apiRequestOAuth2Token = ({
  username,
  password,
}: ApiRequestOAuth2TokenOpts): Promise<AxiosResponse<OAuth2TokenResponse>> => {
  const data = new URLSearchParams(window.location.search);

  data.set('username', username);
  data.set('password', password);

  return accountApiPost({
    apiPath: '/auth/token',
    data,
    // Per OAuth2 specs, this has to be 'application/x-www-form-urlencoded'
    contentType: 'application/x-www-form-urlencoded',
  });
};

type ApiRefreshOAuth2TokenOpts = ApiRequestRequiresTokenOpts;

export const apiRefreshOAuth2Token = ({
  token,
}: ApiRefreshOAuth2TokenOpts): Promise<AxiosResponse<OAuth2TokenResponse>> => (
  accountApiPost({
    apiPath: '/auth/token-refresh',
    data: {
      client_id: env.get('NEXTAUTH_CLIENT_ID').required().asString() || '',
      client_secret: env.get('NEXTAUTH_CLIENT_SECRET').required().asString() || '',
    },
    token,
    contentType: 'application/json',
  })
);

type ApiSignupUserOpts = {
  username: string,
  password: string,
  signupKey: string,
};

export const apiSignupUser = ({
  username,
  password,
  signupKey,
}: ApiSignupUserOpts): Promise<AxiosResponse<UserModelOriginal>> => (
  accountApiPost({
    apiPath: '/auth/signup',
    data: {
      username,
      password,
      signup_key: signupKey,
    },
    contentType: 'application/json',
  })
);

type ApiGenerateSignupKeyOpts = ApiRequestRequiresTokenOpts & {
  accountExpiry: Date,
};

export const apiGenerateSignupKey = ({
  accountExpiry,
  token,
}: ApiGenerateSignupKeyOpts): Promise<AxiosResponse<SignupKeyModel>> => (
  accountApiPost({
    apiPath: '/auth/generate-signup-key',
    data: {
      account_expiry: accountExpiry.toISOString(),
    },
    token,
    contentType: 'application/json',
  })
);
