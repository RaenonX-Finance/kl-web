import React from 'react';

import {useSession} from 'next-auth/react';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';

import {isPagePath} from '../../../const/path';
import styles from '../main.module.scss';
import {NavItemPath} from '../type';


type Props = NavItemPath;

export const NavPath = ({
  pathname,
  path,
  pathActiveBasis,
  pathShowBasis,
  href: hrefProps,
  text,
  disabled,
  requiredPermissions,
}: Props) => {
  const {data} = useSession();
  const isActive = (
    pathname === path ||
    (pathname && isPagePath(pathname) && pathActiveBasis?.includes(pathname))
  );

  if (
    requiredPermissions && !data?.user.isAdmin && (
      !data?.user.permissions.length ||
      data.user.permissions.some((owned) => requiredPermissions.includes(owned))
    )
  ) {
    // Permission check
    return <></>;
  } else if (pathname && isPagePath(pathname) && pathShowBasis && !pathShowBasis.includes(pathname)) {
    // Hide if page path doesn't match
    return <></>;
  }

  const linkProps = {
    className: (
      `${isActive ? styles.active : ''} ` +
      `${requiredPermissions?.length ? styles['nav-item-admin'] : styles['nav-item']}`
    ),
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
