import React from 'react';

import Image from 'next/image';
import Navbar from 'react-bootstrap/Navbar';

import styles from './main.module.scss';
import {GeneralPath} from '../../const/path';


export const NavigationBrand = () => {
  return (
    <Navbar.Brand href={GeneralPath.CHART} className={styles['nav-brand']}>
      {/* size of 28px equals 2rem - this is automatically scaled with the browser */}
      <Image alt="Logo" src="/logo.svg" width={28} height={28}/>
      &nbsp;
      KL 看盤系統
    </Navbar.Brand>
  );
};
