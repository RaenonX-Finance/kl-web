import {ISOTimestampWithTimezone} from '../../../../types/auth/user';
import {Account} from './main';
import styles from './main.module.scss';


export const isExpired = (expiry: Date | ISOTimestampWithTimezone | null): boolean => {
  if (expiry) {
    if (typeof expiry === 'string') {
      return new Date() > new Date(expiry);
    }

    return new Date() > expiry;
  }

  return false;
};

export const getAccountRowClassName = ({expiry, admin, blocked}: Account): string => {
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
