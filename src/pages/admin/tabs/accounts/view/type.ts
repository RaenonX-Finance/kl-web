import {PermissionMap} from '../../../../../types/auth/user';
import {ISODateString} from '../../../../../types/time';
import {Account} from '../main';


export type AccountCellProps = {
  account: Account,
};

export type AccountStatus = 'online' | 'offline' | 'expired' | 'blocked' | 'all';

export type AccountFilterConditions = {
  username: string,
  expiry: {
    start: ISODateString | null,
    end: ISODateString | null,
  },
  status: AccountStatus,
  permissions: PermissionMap,
};
