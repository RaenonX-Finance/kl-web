import React from 'react';

import Link from 'next/link';
import {useRouter} from 'next/router';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';

import styles from './main.module.scss';
import {PanelTab} from './type';
import {NarrowLayout} from '../layout/narrow';


type Props<K extends string, P extends string> = {
  keyToPathMap: {[key in K]: P},
  pathToKeyMap: {[key in P]: K},
  tabs: PanelTab<K, P>[],
};

export const Panel = <K extends string, P extends string>({
  keyToPathMap,
  pathToKeyMap,
  tabs,
}: Props<K, P>) => {
  const {push, pathname} = useRouter();

  const onSelect = async (key: string | null) => {
    await push(keyToPathMap[key as K]);
  };

  return (
    <NarrowLayout>
      <Tab.Container activeKey={pathToKeyMap[pathname as P]} onSelect={onSelect}>
        <Row className="g-3 p-3">
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              {tabs.map(({tabKey, name, link}) => (
                <Nav.Item key={tabKey} className={styles['panel-tab']}>
                  <Nav.Link eventKey={tabKey} href={link} as={Link}>{name}</Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              {tabs.map(({tabKey, Component}) => (
                <Tab.Pane key={tabKey} eventKey={tabKey}>
                  <Component/>
                </Tab.Pane>
              ))}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </NarrowLayout>
  );
};
