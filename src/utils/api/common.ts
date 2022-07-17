import axios, {AxiosResponse} from 'axios';

import {JsonValue} from '../types';


type ApiPostRequestOpts = {
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

export const apiSendPostRequest = <R>({
  apiPath,
  token,
  contentType,
  data,
}: ApiPostRequestOpts): Promise<AxiosResponse<R, URLSearchParams>> => {
  return axios.request({
    url: `${process.env.NEXT_PUBLIC_API_URL}${apiPath}`,
    method: 'POST',
    headers: {
      ...(token ? {Authorization: `Bearer ${token}`} : {}),
      'Content-Type': contentType,
    },
    data,
  });
};
