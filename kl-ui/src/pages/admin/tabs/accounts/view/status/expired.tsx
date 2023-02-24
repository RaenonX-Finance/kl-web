import React from 'react';

import styles from './main.module.scss';


export const StatusExpired = () => {
  return <i className={`bi bi-exclamation-circle ${styles['expired']}`}/>;
};
