import {ISOTimestampWithTimezone} from '../time';


/**
 * Permission names.
 *
 * This should have the same definition as `Permission` in the backend.
 */
export type Permission =
  'chart:view' |
  'permission:add' |
  'permission:remove' |
  'account:expiry' |
  'account:new' |
  'account:block' |
  'account:view' |
  'config:session';

export type PermissionMap = {[permission in Permission]: boolean};

export const isPermissionManagement: PermissionMap = {
  'chart:view': false,
  'permission:add': true,
  'permission:remove': true,
  'account:expiry': true,
  'account:new': true,
  'account:block': true,
  'account:view': true,
  'config:session': true,
};

export const managementPermissions: Permission[] = Object.entries(isPermissionManagement)
  .filter(([_, isManagement]) => isManagement)
  .map(([permission]) => permission as Permission);

export const availablePermissions: Permission[] = Object.keys(isPermissionManagement) as Permission[];

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
