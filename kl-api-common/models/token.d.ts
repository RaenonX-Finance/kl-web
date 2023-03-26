import {Permission} from 'kl-web-common/models/api/account/permission';


export type UserInfo = {
  admin: boolean,
  permissions: Permission
};

// Same as `TokenCheckResult` from the account API
export type TokenCheckResultFromApi = UserInfo & {
  ok: true,
};

export type TokenCheckResult = TokenCheckResultFromApi | {
  ok: false,
  error: string,
};
