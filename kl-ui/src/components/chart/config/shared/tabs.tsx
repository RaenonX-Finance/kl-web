import React from 'react';

import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';

import styles from './main.module.scss';
import {ChartLayoutSelector} from '../../layoutSelector/main';


type Props = {
  closeModal: () => void,
};

export const PxChartSharedConfigTabs = ({closeModal}: Props) => {
  return (
    <Tab.Container defaultActiveKey="layout">
      <Row className="g-3 p-3">
        <Col sm={3}>
          <Nav variant="pills" className="flex-column" navbar={false}>
            <Nav.Item>
              <Nav.Link eventKey="layout" className={styles['tab-group']}>版面配置</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey="layout">
              <ChartLayoutSelector onSelect={closeModal}/>
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
};
