import {Permission} from 'kl-web-common/models/api/account/permission';

import {ISOTimestampWithTimezone} from '../time';


/**
 * User data model returned by calling the `userinfo` URL defined in `next-auth` custom OAuth provider config.
 *
 * This should have the same schema as `UserDataModel` in the backend.
 */
export type UserModelOriginal = {
  _id: string,
  username: string,
  email: `${string}@${string}.${string}` | null,
  expiry: ISOTimestampWithTimezone | null,
  blocked: boolean,
  admin: boolean,
  permissions: Permission[],
};

/**
 * User data model being used when `useSession()` from `next-auth/react` is called.
 *
 * This does not necessarily have the same structure as {@link UserModelOriginal}.
*/
export type UserModel = {
  id: string,
  username: UserModelOriginal['username'],
  email: UserModelOriginal['email'],
  isAdmin: UserModelOriginal['admin'],
  // Can't use Date type here because it still gets stored in ISOTimestamp
  expiry: ISOTimestampWithTimezone | null,
  permissions: UserModelOriginal['permissions'],
  token: string | undefined,
};

/**
 * Data model of an account sign up key.
 *
 * This should have the same schema as `SignupKeyModel` in the backend.
 */
export type SignupKeyModel = {
  signup_key: string,
  expiry: string,
  account_expiry: string,
};
