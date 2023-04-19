import axios, {AxiosResponse, AxiosError} from 'axios';

import {ApiRequestCommonOpts} from './types';
import {getCommonAxiosConfig} from './utils';
import {JsonValue} from '../../types';


export type ApiPostOpts = ApiRequestCommonOpts & ({
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
  isTimeoutRetry?: boolean,
};

const apiPost = async <R>(opts: ApiPostCommonOpts): Promise<AxiosResponse<R, URLSearchParams>> => {
  const {apiUrl, apiPath, data, onRetryAttempt, onRetrySuccess, isTimeoutRetry} = opts;

  if (!apiUrl) {
    throw new Error(`API URL unavailable for API POST call to ${apiPath}`);
  }

  try {
    const response: AxiosResponse<R, URLSearchParams> = await axios.request({
      ...getCommonAxiosConfig({
        ...opts,
        apiUrl,
        method: 'POST',
      }),
      data,
    });

    if (isTimeoutRetry && onRetryAttempt && response.status === 200) {
      onRetrySuccess();
    }

    return response;
  } catch (err) {
    if (err instanceof AxiosError && err.code === 'ECONNABORTED' && onRetryAttempt) {
      onRetryAttempt(err);
      return apiPost({...opts, isTimeoutRetry: true});
    }
    throw err;
  }
};
