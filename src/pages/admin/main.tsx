import React from 'react';

import Link from 'next/link';
import {useRouter} from 'next/router';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';

import {NarrowLayout} from '../../components/layout/narrow';
import {PermissionLayout} from '../../components/layout/permission';
import {managementPermissions} from '../../types/auth/user';
import {adminTabs, DEFAULT_ADMIN_TAB_KEY, tabKeyToAdminPath} from './const';
import styles from './main.module.scss';
import {AdminTabKey} from './type';


type Props = {
  tabKey?: AdminTabKey,
};

export const AdminPanel = ({tabKey}: Props) => {
  const [key, setKey] = React.useState<AdminTabKey>(tabKey || DEFAULT_ADMIN_TAB_KEY);
  const {push} = useRouter();

  const onSelect = async (key: string | null) => {
    const typedKey = key as AdminTabKey;

    setKey(typedKey);
    await push(tabKeyToAdminPath[typedKey]);
  };

  return (
    <PermissionLayout allowedWithPermissions={managementPermissions}>
      <NarrowLayout>
        <Tab.Container activeKey={key} onSelect={onSelect}>
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
