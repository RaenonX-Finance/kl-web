import React from 'react';

import styles from './main.module.scss';


export const StatusOnline = () => {
  return <i className={`bi bi-circle-fill ${styles['online']}`}/>;
};
