import {PermissionMap} from 'kl-web-common/models/api/account/permission';
import {ISODateString} from 'kl-web-common/types/time';

import {AccountData} from '../../../../../types/admin';


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
