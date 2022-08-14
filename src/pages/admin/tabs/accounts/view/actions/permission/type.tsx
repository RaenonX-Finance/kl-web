import {PermissionMap} from '../../../../../../../types/auth/user';


export type PermissionChangeState = {
  add: PermissionMap,
  remove: PermissionMap,
};

export type PermissionChangeType = keyof PermissionChangeState;
