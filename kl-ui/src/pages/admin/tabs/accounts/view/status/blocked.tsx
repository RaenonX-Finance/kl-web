import React from 'react';

import styles from './main.module.scss';


export const StatusBlocked = React.memo(() => {
  return <i className={`bi bi-dash-circle ${styles['blocked']}`}/>;
});

StatusBlocked.displayName = 'StatusBlocked';
