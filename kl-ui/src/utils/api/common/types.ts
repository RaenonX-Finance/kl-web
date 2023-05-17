import {AxiosError} from 'axios';


export type ApiRequestRequiresTokenOpts = {
  token: string,
};

export type ApiRequestCommonOpts = {
  /**
   * This has to start with `/`.
   */
  apiPath: string,
  token?: string,
} & (
  ApiRetryableRequestOpts | {
    onRetryAttempt?: never,
    onRetrySuccess?: never,
  });

export type ApiRetryableRequestOpts = {
  onRetryAttempt: (err: AxiosError) => void,
  onRetrySuccess: () => void,
};
