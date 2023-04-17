import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';


type ApiGetOpts = {
  /**
   * This has to start with `/`.
   */
  apiPath: string,
  token?: string,
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

type ApiGetCommonOpts = ApiGetOpts & {
  apiUrl?: string,
};

const apiGet = <R>({
  apiUrl,
  apiPath,
  token,
  params,
}: ApiGetCommonOpts): Promise<AxiosResponse<R, URLSearchParams>> => {
  if (!apiUrl) {
    throw new Error(`API URL unavailable for API GET call to ${apiPath}`);
  }

  return axios.request({
    url: `${apiUrl}${apiPath}`,
    method: 'GET',
    headers: {
      ...(token ? {Authorization: `Bearer ${token}`} : {}),
      'Content-Type': 'application/json',
    },
    params,
    timeout: 10000,
    timeoutErrorMessage: `GET request to \`${apiPath}\` timed out after 10 secs`,
  });
};
