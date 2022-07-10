import axios, {AxiosResponse} from 'axios';


type ApiSendPostRequestOpts = {
  /**
   * This has to start with `/`.
   */
  apiPath: string,
  // Forcing `URLSearchParams`
  // because FastAPI receives `Content-Type: application/x-www-form-urlencoded` using `Body(...)`
  data: URLSearchParams,
  token?: string,
};

export const apiSendPostRequest = <R>({
  apiPath,
  data,
  token,
}: ApiSendPostRequestOpts): Promise<AxiosResponse<R, URLSearchParams>> => {
  return axios.request({
    url: `${process.env.NEXT_PUBLIC_API_URL}${apiPath}`,
    method: 'POST',
    headers: {
      ...(token ? {Authorization: `Bearer ${token}`} : {}),
    },
    data,
  });
};
