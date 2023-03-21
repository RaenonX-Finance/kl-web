import axios, {AxiosError} from 'axios';
import {FastifyBaseLogger} from 'fastify';

import {accountApiUrl} from './const';
import {TokenCheckResult, TokenCheckResultFromApi} from '../../models/token';


type TokenAuthError = {
  detail: string
};

export const isTokenValid = async (
  logger: FastifyBaseLogger, token: string | null | undefined,
): Promise<TokenCheckResult> => {
  if (!token) {
    return {ok: false, error: 'Token is undefined'};
  }

  try {
    const res = await axios.request<TokenCheckResultFromApi>({
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
      return {ok: false, error: 'Server did not truthy OK'};
    }

    return res.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorResponse = (err as AxiosError<TokenAuthError>).response;

      if (!errorResponse) {
        throw err;
      }

      const errorBody = errorResponse.data;
      logger.warn({error: errorBody}, 'Token validation failed (%s)', err.message);

      return {ok: false, error: errorBody.detail};
    }

    throw err;
  }
};
