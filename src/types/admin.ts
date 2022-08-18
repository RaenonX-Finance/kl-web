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

export type AccountDataMap = {[accountId in string]: AccountData};

export type FuturesMarketClosedSession = {
  id: string,
  security: string,
  start: ISOTimestampWithTimezone,
  end: ISOTimestampWithTimezone,
};
