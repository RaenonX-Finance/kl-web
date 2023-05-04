import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import styles from './main.module.scss';
import {FinancialEventEntryProps} from './type';


export const FinancialEventValues = ({entry}: FinancialEventEntryProps) => {
  const {previous, forecast, actual, revised} = entry;

  return (
    <>
      {
        actual &&
        <Row>
          <Col>
            實際:&nbsp;<span className={styles['actual-value']}>{actual}</span>
          </Col>
        </Row>
      }
      {
        (previous || forecast || revised) &&
        <Row>
          <Col className={styles['sub-values']}>
            {previous && <small>前值:&nbsp;{previous}</small>}
            {forecast && <small>預測:&nbsp;{forecast}</small>}
            {revised && <small>修正:&nbsp;{revised}</small>}
          </Col>
        </Row>
      }
    </>
  );
};
