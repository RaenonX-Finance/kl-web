import {AxiosRequestConfig} from 'axios';

import {ApiRequestCommonOpts} from './types';


export type GetCommonAxiosConfigOpts = ApiRequestCommonOpts & {
  apiUrl: string,
} & ({
  method: 'GET',
  contentType?: never,
} | {
  method: 'POST'
  contentType: string,
});

export const getCommonAxiosConfig = <D>({
  apiUrl,
  apiPath,
  token,
  method,
  contentType,
}: GetCommonAxiosConfigOpts): AxiosRequestConfig<D> => {
  return {
    url: `${apiUrl}${apiPath}`,
    method,
    headers: {
      ...(token ? {Authorization: `Bearer ${token}`} : {}),
      'Content-Type': contentType || 'application/json',
    },
    timeout: 10000,
    timeoutErrorMessage: `${method} request to \`${apiPath}\` timed out after 10 secs`,
  };
};
