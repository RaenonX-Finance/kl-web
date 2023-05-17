import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import styles from './main.module.scss';
import {FinancialEventEntryProps} from './type';


export const FinancialEventValues = ({entry}: FinancialEventEntryProps) => {
  const {previous, forecast, actual} = entry;

  return (
    <Row>
      <Col xs className={styles['actual-value']}>
        <span className={styles['value-title']}>實際</span>&nbsp;
        <span className={styles['value-number']}>{actual || '-'}</span>
      </Col>
      <Col xs className={styles['sub-values']}>
        <span className={styles['value-title']}>預測</span>&nbsp;
        <span className={styles['value-number']}>{forecast || '-'}</span>
      </Col>
      <Col xs className={styles['sub-values']}>
        <span className={styles['value-title']}>前值</span>&nbsp;
        <span className={styles['value-number']}>{previous || '-'}</span>
      </Col>
    </Row>
  );
};
