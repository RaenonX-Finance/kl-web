import axios, {AxiosResponse} from 'axios';


type ApiGetOpts = {
  /**
   * This has to start with `/`.
   */
  apiPath: string,
  token?: string,
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

type ApiPostCommonOpts = ApiGetOpts & {
  apiUrl?: string,
};

const apiGet = <R>({
  apiUrl,
  apiPath,
  token,
}: ApiPostCommonOpts): Promise<AxiosResponse<R, URLSearchParams>> => {
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
    timeout: 10000,
    timeoutErrorMessage: `GET request to \`${apiPath}\` timed out after 10 secs`,
  });
};
