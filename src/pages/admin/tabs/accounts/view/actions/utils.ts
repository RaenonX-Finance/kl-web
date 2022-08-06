import {availablePermissions, PermissionMap} from '../../../../../../types/auth/user';


export const generatePermissionMap = (initialValue: boolean): PermissionMap => (
  Object.fromEntries(availablePermissions.map((permission) => [permission, initialValue])) as PermissionMap
);
