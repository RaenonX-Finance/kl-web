import React from 'react';

import Link from 'next/link';
import {useRouter} from 'next/router';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';

import {adminPathToTabKey, adminTabs, tabKeyToAdminPath} from './const';
import styles from './main.module.scss';
import {AdminTabKey} from './type';
import {NarrowLayout} from '../../components/layout/narrow';
import {PermissionLayout} from '../../components/layout/permission';
import {AdminPath} from '../../const/path';
import {managementPermissions} from '../../types/auth/user';


export const AdminPanel = () => {
  const {push, pathname} = useRouter();

  const onSelect = async (key: string | null) => {
    await push(tabKeyToAdminPath[key as AdminTabKey]);
  };

  return (
    <PermissionLayout allowedWithPermissions={managementPermissions}>
      <NarrowLayout>
        <Tab.Container activeKey={adminPathToTabKey[pathname as AdminPath]} onSelect={onSelect}>
          <Row className="g-3 p-3">
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                {adminTabs.map(({tabKey, name, link}) => (
                  <Nav.Item key={tabKey} className={styles['admin-tab']}>
                    <Link href={link}>
                      <Nav.Link eventKey={tabKey}>{name}</Nav.Link>
                    </Link>
                  </Nav.Item>
                ))}
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                {adminTabs.map(({tabKey, Component}) => (
                  <Tab.Pane key={tabKey} eventKey={tabKey}>
                    <Component/>
                  </Tab.Pane>
                ))}
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </NarrowLayout>
    </PermissionLayout>
  );
};
