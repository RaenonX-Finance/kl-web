import {AccountData} from '../../../../../types/admin';
import {PermissionMap} from '../../../../../types/auth/user';
import {ISODateString} from '../../../../../types/time';


export type AccountCellProps = {
  account: AccountData,
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
