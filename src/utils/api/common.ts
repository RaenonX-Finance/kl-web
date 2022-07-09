import axios from 'axios';


type ApiSendPostRequestOpts = {
  /**
   * This has to start with `/`.
   */
  apiPath: string,
  // Forcing `URLSearchParams`
  // because FastAPI receives `Content-Type: application/x-www-form-urlencoded` using `Body(...)`
  data: URLSearchParams,
};

export const apiSendPostRequest = ({apiPath, data}: ApiSendPostRequestOpts) => {
  return axios.request({
    url: `${process.env.NEXT_PUBLIC_API_URL}${apiPath}`,
    method: 'POST',
    data,
  });
};
