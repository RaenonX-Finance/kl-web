import React from 'react';

import styles from './main.module.scss';


export const StatusOnline = React.memo(() => {
  return <i className={`bi bi-circle-fill ${styles['online']}`}/>;
});

StatusOnline.displayName = 'StatusOnline';
