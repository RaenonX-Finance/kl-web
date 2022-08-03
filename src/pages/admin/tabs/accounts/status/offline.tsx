import React from 'react';

import styles from './main.module.scss';


export const StatusOffline = () => {
  return <i className={`bi bi-circle ${styles['offline']}`}/>;
};
