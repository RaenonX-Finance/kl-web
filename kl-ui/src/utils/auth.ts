import {AxiosError} from 'axios';
import * as env from 'env-var';
import {JWT} from 'next-auth/jwt';

import {apiRefreshOAuth2Token} from './api/account/auth';
import {UserJwt} from '../types/auth/jwt';


export const insecureDecodeJWT = (jwt: string): UserJwt => {
  return JSON.parse(Buffer.from(jwt.split('.')[1], 'base64').toString());
};

export const refreshAccessToken = async (token: JWT): Promise<JWT> => {
  const secret = env.get('NEXTAUTH_SECRET').required().asString();

  if (!secret) {
    throw new Error('`NEXTAUTH_SECRET` not defined in environment variables.');
  }

  try {
    const expiredToken = token.user.token;

    if (!expiredToken) {
      return {
        ...token,
        error: 'ExpiredTokenNotExistsError',
      };
    }

    const {data, status} = await apiRefreshOAuth2Token({token: expiredToken});

    if (status !== 200) {
      return {
        ...token,
        error: 'RefreshAccessTokenFailedError',
      };
    }

    const refreshedToken = insecureDecodeJWT(data.access_token);

    if (!refreshedToken) {
      return {
        ...token,
        error: 'RefreshedTokenDecodeError',
      };
    }

    return {
      ...token,
      error: null,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(`${error.code} - ${error.message}`);
      console.error(JSON.stringify(error.response?.data || {}));
    } else {
      console.error(error);
    }


    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
};
