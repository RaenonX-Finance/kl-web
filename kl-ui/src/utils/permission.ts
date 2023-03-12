import {isPermissionManagement, Permission, UserModel} from '../types/auth/user';


type IsAllowedOpts = Pick<UserModel, 'isAdmin' | 'permissions'> & {
  allowedWithPermissions: Permission[],
};

export const isAllowed = ({isAdmin, permissions, allowedWithPermissions}: IsAllowedOpts) => {
  if (isAdmin) {
    return true;
  }

  return permissions.some((permission) => allowedWithPermissions.includes(permission));
};

export const isModerator = (permissions: Permission[]): boolean => {
  return permissions.some((permission) => isPermissionManagement[permission]);
};
