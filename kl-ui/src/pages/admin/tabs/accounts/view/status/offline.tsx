import React from 'react';

import styles from './main.module.scss';


export const StatusOffline = React.memo(() => {
  return <i className={`bi bi-circle ${styles['offline']}`}/>;
});

StatusOffline.displayName = 'StatusOffline';
