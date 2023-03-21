import {PermissionMap} from 'kl-web-common/models/api/account/permission';


export type PermissionChangeState = {
  add: PermissionMap,
  remove: PermissionMap,
};

export type PermissionChangeType = keyof PermissionChangeState;
