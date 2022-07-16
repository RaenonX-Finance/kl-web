import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';


type ApiRequestOpts = {
  /**
   * This has to start with `/`.
   */
  apiPath: string,
  // Forcing `URLSearchParams`
  // because FastAPI receives `Content-Type: application/x-www-form-urlencoded` using `Body(...)`
  data?: URLSearchParams,
  token?: string,
};

const getAxiosCommonOptions = ({
  apiPath,
  token,
  data,
}: ApiRequestOpts): AxiosRequestConfig<ApiRequestOpts['data']> => ({
  url: `${process.env.NEXT_PUBLIC_API_URL}${apiPath}`,
  headers: {
    ...(token ? {Authorization: `Bearer ${token}`} : {}),
  },
  data,
});

export const apiSendPostRequest = <R>(opts: ApiRequestOpts): Promise<AxiosResponse<R, URLSearchParams>> => {
  return axios.request({
    ...getAxiosCommonOptions(opts),
    method: 'POST',
  });
};

export const apiSendGetRequest = <R>(opts: ApiRequestOpts): Promise<AxiosResponse<R, URLSearchParams>> => {
  return axios.request({
    ...getAxiosCommonOptions(opts),
    method: 'GET',
  });
};
