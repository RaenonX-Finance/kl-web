import axios, {AxiosResponse} from 'axios';

import {JsonValue} from '../../types';


type ApiPostOpts = {
  /**
   * This has to start with `/`.
   */
  apiPath: string,
  token?: string,
} & ({
  contentType: 'application/json',
  data: JsonValue,
} | {
  contentType: 'application/x-www-form-urlencoded',
  data: URLSearchParams,
});

export const pxApiPost = <R>(opts: ApiPostOpts): Promise<AxiosResponse<R, URLSearchParams>> => {
  return apiPost({
    apiUrl: process.env.NEXT_PUBLIC_PX_API_URL,
    ...opts,
  });
};

export const accountApiPost = <R>(opts: ApiPostOpts): Promise<AxiosResponse<R, URLSearchParams>> => {
  return apiPost({
    apiUrl: process.env.NEXT_PUBLIC_ACCOUNT_API_URL,
    ...opts,
  });
};

type ApiPostCommonOpts = ApiPostOpts & {
  apiUrl?: string,
};

const apiPost = <R>({
  apiUrl,
  apiPath,
  token,
  contentType,
  data,
}: ApiPostCommonOpts): Promise<AxiosResponse<R, URLSearchParams>> => {
  if (!apiUrl) {
    throw new Error(`API URL unavailable for API POST call to ${apiPath}`);
  }

  return axios.request({
    url: `${apiUrl}${apiPath}`,
    method: 'POST',
    headers: {
      ...(token ? {Authorization: `Bearer ${token}`} : {}),
      'Content-Type': contentType,
    },
    data,
    timeout: 10000,
    timeoutErrorMessage: `POST request to \`${apiPath}\` timed out after 10 secs`,
  });
};
