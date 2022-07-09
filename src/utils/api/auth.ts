import {AxiosResponse} from 'axios';

import {CUSTOM_PROVIDER_ID} from '../../types/auth/const';
import {RequestOAuth2TokenResponse} from '../../types/auth/oauth';
import {apiSendPostRequest} from './common';


export const apiGetNextAuthCallbackUrl = (accessToken: string): string => {
  const url = new URL(`${process.env.NEXT_PUBLIC_HOST_URL}/api/auth/callback/${CUSTOM_PROVIDER_ID}`);
  url.search = window.location.search;
  // Key name must be `access_token`
  url.searchParams.set('access_token', accessToken);

  return url.toString();
};

type RequestOAuth2TokenData = {
  grant_type: 'client_credentials',
};

type ApiRequestOAuth2TokenOpts = {
  username: string,
  password: string,
};

export const apiRequestOAuth2Token = ({
  username,
  password,
}: ApiRequestOAuth2TokenOpts): Promise<AxiosResponse<RequestOAuth2TokenResponse, RequestOAuth2TokenData>> => {
  const data = new URLSearchParams(window.location.search);

  data.set('username', username);
  data.set('password', password);

  return apiSendPostRequest({
    apiPath: '/auth/token',
    data,
  });
};

type ApiSignupUserOpts = {
  username: string,
  password: string,
  signupKey: string,
};

export const apiSignupUser = ({username, password, signupKey}: ApiSignupUserOpts) => {
  const data = new URLSearchParams();

  data.set('username', username);
  data.set('password', password);
  data.set('signup_key', signupKey);

  return apiSendPostRequest({
    apiPath: '/auth/signup',
    data,
  });
};
