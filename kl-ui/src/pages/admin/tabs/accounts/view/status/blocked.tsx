import React from 'react';

import styles from './main.module.scss';


export const StatusBlocked = () => {
  return <i className={`bi bi-dash-circle ${styles['blocked']}`}/>;
};
