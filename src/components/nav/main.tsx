import React from 'react';

import {useRouter} from 'next/router';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';

import {NavigationBrand} from './brand';
import {navItemsAtLeft, navItemsAtRight} from './const';
import {NavItems} from './items';
import styles from './main.module.scss';


export const Navigation = () => {
  const {pathname} = useRouter();

  return (
    <Navbar variant="dark" expand="md" id="nav" className={styles['nav-main']}>
      <Container fluid>
        <NavigationBrand/>
        <Navbar.Toggle/>
        <Navbar.Offcanvas placement="top">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              <NavigationBrand/>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className={`${styles['nav-body']} ${styles['nav-body-left']}`}>
              <NavItems navItems={navItemsAtLeft} pathname={pathname}/>
            </Nav>
            <Nav className={styles['nav-body']}>
              <NavItems navItems={navItemsAtRight} pathname={pathname}/>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};
