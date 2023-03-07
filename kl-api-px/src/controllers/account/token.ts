import axios, {AxiosError} from 'axios';

import {accountApiUrl} from './const';
import {Logger} from '../../const';


type TokenCheckResult = {
  ok: boolean,
};

type TokenAuthError = {
  detail: string
};

export const isTokenValid = async (token: string | null | undefined): Promise<string | null> => {
  if (!token) {
    return 'Token is undefined';
  }

  try {
    const res = await axios.request<TokenCheckResult>({
      url: `${accountApiUrl}/auth/token-check`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {token},
      timeout: 10000,
      timeoutErrorMessage: `POST request to check token timed out after 10 secs`,
    });

    if (!res.data.ok) {
      return 'Server did not return OK';
    }

    return null;
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorResponse = (err as AxiosError<TokenAuthError>).response;

      if (!errorResponse) {
        throw err;
      }

      const errorBody = errorResponse.data;
      Logger.warn({error: errorBody}, 'Token validation failed (%s)', err.message);

      return errorBody.detail;
    }

    throw err;
  }
};
