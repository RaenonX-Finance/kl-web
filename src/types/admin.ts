import {Permission} from './auth/user';
import {ISOTimestampWithTimezone} from './time';


export type AccountData = {
  id: string,
  username: string,
  permissions: Permission[],
  expiry: ISOTimestampWithTimezone | null,
  blocked: boolean,
  admin: boolean,
  online: boolean,
};
