import React from 'react';

import Navbar from 'react-bootstrap/Navbar';

import {GeneralPath} from '../../const/path';
import styles from './main.module.scss';


export const NavigationBrand = () => {
  return (
    <Navbar.Brand href={GeneralPath.CHART} className={styles['nav-brand']}>
      <img alt="Logo" src="/logo192.png" className={styles['nav-logo']}/>
      &nbsp;
      KL 看盤系統
    </Navbar.Brand>
  );
};
