import {PermissionMap} from 'kl-web-common/models/api/account/permission';

import {AccountData} from '../../../../../types/admin';
import {ISODateString} from '../../../../../types/time';


export type UpdateSingleAccount = (account: AccountData) => void;

export type AccountCellProps = {
  account: AccountData,
};

export type AccountCellUpdatableProps = AccountCellProps & {
  updateSingleAccount: UpdateSingleAccount,
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
