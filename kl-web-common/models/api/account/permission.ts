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
