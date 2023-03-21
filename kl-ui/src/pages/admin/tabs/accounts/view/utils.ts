import {availablePermissions, Permission, PermissionMap} from 'kl-web-common/models/api/account/permission';

import styles from './main.module.scss';
import {AccountFilterConditions} from './type';
import {AccountData} from '../../../../../types/admin';
import {ISOTimestampWithTimezone} from '../../../../../types/time';


export const isExpired = (expiry: Date | ISOTimestampWithTimezone | null): boolean => {
  if (expiry) {
    if (typeof expiry === 'string') {
      return new Date() > new Date(expiry);
    }

    return new Date() > expiry;
  }

  return false;
};

export const getAccountRowClassName = ({expiry, admin, blocked}: AccountData): string => {
  if (blocked) {
    return styles['blocked'];
  }

  if (isExpired(expiry)) {
    return styles['expired'];
  }

  if (admin) {
    return styles['admin'];
  }

  return '';
};

export const generatePermissionMap = (initialValue: boolean): PermissionMap => (
  Object.fromEntries(availablePermissions.map((permission) => [permission, initialValue])) as PermissionMap
);

export const filterAccounts = (
  accounts: AccountData[],
  {username, status, expiry, permissions}: AccountFilterConditions,
): AccountData[] => {
  // Filter by username
  if (username) {
    accounts = accounts.filter((account) => account.username.toUpperCase().includes(username.toUpperCase()));
  }

  // Filter by status
  if (status === 'online') {
    accounts = accounts.filter((account) => account.online);
  } else if (status === 'offline') {
    accounts = accounts.filter((account) => !account.online);
  } else if (status === 'expired') {
    accounts = accounts.filter((account) => isExpired(account.expiry));
  } else if (status === 'blocked') {
    accounts = accounts.filter((account) => account.blocked);
  }

  // Filter by expiry
  accounts = accounts.filter((account) => {
    if (!expiry.start && !expiry.end) {
      // Expiry range not provided - "disable" filter
      return true;
    }
    if (!account.expiry && (expiry.start || expiry.end)) {
      // Account does not expire, but expiry range is given
      return false;
    }

    const isAfterExpiryStart = (
      !!account.expiry &&
      (expiry.start ? new Date(account.expiry) > new Date(expiry.start) : true)
    );
    const isBeforeExpiryEnd = (
      !!account.expiry &&
      (expiry.end ? new Date(account.expiry) < new Date(expiry.end) : true)
    );

    return isAfterExpiryStart && isBeforeExpiryEnd;
  });

  // Filter by permissions
  const selectedPermissions = Object
    .entries(permissions)
    .filter(([_, selected]) => selected)
    .map(([permission]) => permission as Permission);
  if (selectedPermissions.length) {
    accounts = accounts.filter((account) => {
      const accountMatchingPermissions = account.permissions
        .filter((permission) => selectedPermissions.includes(permission));

      return accountMatchingPermissions.length === selectedPermissions.length;
    });
  }

  return accounts;
};
