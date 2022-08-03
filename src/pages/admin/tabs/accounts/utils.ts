import {Account} from './main';
import styles from './main.module.scss';


export const isExpired = (expiry: Date | null): boolean => expiry ? new Date() > expiry : false;

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
