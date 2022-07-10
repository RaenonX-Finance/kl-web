import {User} from 'next-auth';
import {ISODateString} from 'next-auth/core/types';
import {DefaultJWT} from 'next-auth/jwt/types';
import {UserJwt} from '../../src/types/auth/jwt';
import {UserModel} from '../../src/types/auth/user';


type JwtError =
  'RefreshAccessTokenError' |
  'RefreshAccessTokenFailedError' |
  'ExpiredTokenNotExistsError' |
  'RefreshedTokenDecodeError';

// Must use interface here
// https://next-auth.js.org/getting-started/typescript#main-module
module 'next-auth' {
  interface User extends UserModel {}

  interface DefaultSession {
    user: User;
    expires: ISODateString;
  }

  interface Session {
    user: User;
    error: JwtError | null;
  }
}

module 'next-auth/jwt' {
  interface JWT extends DefaultJWT, UserJwt {
    user: User;
    error: JwtError | null;
  }
}
