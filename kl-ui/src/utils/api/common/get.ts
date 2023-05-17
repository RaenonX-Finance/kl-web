import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';

import {ApiRequestCommonOpts} from './types';
import {getCommonAxiosConfig} from './utils';


type ApiGetOpts = ApiRequestCommonOpts & {
  params?: AxiosRequestConfig['params'],
};

export const infoApiGet = <R>(opts: ApiGetOpts): Promise<AxiosResponse<R, URLSearchParams>> => {
  return apiGet({
    apiUrl: process.env.NEXT_PUBLIC_INFO_API_URL,
    ...opts,
  });
};

export const pxApiGet = <R>(opts: ApiGetOpts): Promise<AxiosResponse<R, URLSearchParams>> => {
  return apiGet({
    apiUrl: process.env.NEXT_PUBLIC_PX_API_URL,
    ...opts,
  });
};

export const accountApiGet = <R>(opts: ApiGetOpts): Promise<AxiosResponse<R, URLSearchParams>> => {
  return apiGet({
    apiUrl: process.env.NEXT_PUBLIC_ACCOUNT_API_URL,
    ...opts,
  });
};

export const dailyFxApiGet = <R>(opts: ApiGetOpts): Promise<AxiosResponse<R, URLSearchParams>> => {
  return apiGet({
    apiUrl: 'https://www.dailyfxasia.com/cn/calendar',
    ...opts,
  });
};

type ApiGetCommonOpts = ApiGetOpts & {
  apiUrl?: string,
  isTimeoutRetry?: boolean,
};

const apiGet = async <R>(opts: ApiGetCommonOpts): Promise<AxiosResponse<R, URLSearchParams>> => {
  const {apiUrl, apiPath, params, onRetryAttempt, onRetrySuccess, isTimeoutRetry} = opts;

  if (!apiUrl) {
    throw new Error(`API URL unavailable for API GET call to ${apiPath}`);
  }

  try {
    const response: AxiosResponse<R, URLSearchParams> = await axios.request({
      ...getCommonAxiosConfig({
        ...opts,
        apiUrl,
        method: 'GET',
      }),
      params,
    });

    if (isTimeoutRetry && onRetryAttempt && response.status === 200) {
      onRetrySuccess();
    }

    return response;
  } catch (err) {
    if (err instanceof AxiosError && err.code === 'ECONNABORTED' && onRetryAttempt) {
      onRetryAttempt(err);
      return apiGet(opts);
    }
    throw err;
  }
};
