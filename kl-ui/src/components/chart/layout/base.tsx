import React from 'react';

import styles from './main.module.scss';


type Props = {
  refCallback: React.RefCallback<HTMLDivElement>,
};

export const LayoutBase = ({children, refCallback}: React.PropsWithChildren<Props>) => {
  return (
    <div className={styles['layout']} ref={refCallback}>
      {children}
    </div>
  );
};
