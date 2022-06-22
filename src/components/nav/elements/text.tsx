import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import styles from '../main.module.scss';
import {NavItemText} from '../type';


type Props = NavItemText;

export const NavText = ({text}: Props) => {
  return (
    <Row>
      <Col>
        <div className={styles['text']}>
          {text}
        </div>
      </Col>
    </Row>
  );
};
