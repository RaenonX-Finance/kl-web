import axios, {AxiosResponse} from 'axios';

import {CUSTOM_PROVIDER_ID} from '../types/auth/const';
import {RequestOAuth2TokenResponse} from '../types/auth/oauth';


type RequestOAuth2TokenData = {
  grant_type: 'client_credentials',
};

export const requestOAuth2Token = (
  username: string,
  password: string,
): Promise<AxiosResponse<RequestOAuth2TokenResponse, RequestOAuth2TokenData>> => {
  const data = new URLSearchParams(window.location.search);

  data.set('username', username);
  data.set('password', password);

  return axios.request({
    url: process.env.NEXT_PUBLIC_AUTH_URL_TOKEN,
    method: 'POST',
    // Using `Content-Type: application/x-www-form-urlencoded`, so `data` must be `URLSearchParams`
    data,
  });
};

export const getNextAuthCallbackUrl = (accessToken: string): string => {
  const url = new URL(`${process.env.NEXT_PUBLIC_AUTH_URL}/api/auth/callback/${CUSTOM_PROVIDER_ID}`);
  url.search = window.location.search;
  // Key name must be `access_token`
  url.searchParams.set('access_token', accessToken);

  return url.toString();
};
