import React from 'react';

import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';

import {isPagePath} from '../../../const/path';
import {useSession} from '../../../mock/authSession';
import styles from '../main.module.scss';
import {NavItemPath} from '../type';


type Props = NavItemPath;

export const NavPath = ({
  pathname,
  path,
  pathActiveBasis,
  href: hrefProps,
  text,
  disabled,
  adminOnly = false,
}: Props) => {
  const {data} = useSession();
  const isActive = (
    pathname === path ||
    (pathname && isPagePath(pathname) && pathActiveBasis?.includes(pathname))
  );

  if (adminOnly && !data?.user.isAdmin) {
    return <></>;
  }

  const linkProps = {
    className: `${isActive ? styles.active : ''} ${adminOnly ? styles['nav-item-admin'] : styles['nav-item']}`,
    href: path || hrefProps,
    disabled,
    target: hrefProps ? '_blank' : '_self',
  };

  return (
    <Row>
      <Col>
        <Nav.Link {...linkProps} data-test-is-active={isActive}>
          {text}
        </Nav.Link>
      </Col>
    </Row>
  );
};
