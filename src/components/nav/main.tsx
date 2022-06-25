import React from 'react';

import {useRouter} from 'next/router';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';

import {NavigationBrand} from './brand';
import {navItems} from './const';
import {NavComponent} from './elements/component';
import {NavPath} from './elements/path';
import {NavText} from './elements/text';
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
            <Nav className={styles['nav-body']}>
              {navItems.map((navItem, idx) => {
                const {type} = navItem;

                if (type === 'path') {
                  return <NavPath key={idx} pathname={pathname} {...navItem}/>;
                }
                if (type === 'text') {
                  return <NavText key={idx} pathname={pathname} {...navItem}/>;
                }
                if (type === 'component') {
                  return <NavComponent key={idx} pathname={pathname} {...navItem}/>;
                }
              })}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};
