import React from 'react';

import {signOut, useSession} from 'next-auth/react';
import Nav from 'react-bootstrap/Nav';

import styles from '../../nav/main.module.scss';


export const LogoutNavButton = () => {
  const {status} = useSession();

  if (status === 'unauthenticated') {
    return <></>;
  }

  return (
    <Nav.Link className={styles['nav-item']} disabled={status === 'loading'} onClick={() => signOut()}>
      登出
    </Nav.Link>
  );
};
