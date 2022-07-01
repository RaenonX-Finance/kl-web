import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';

import {avg} from '../../utils/calc';
import styles from './main.module.scss';


type Props = {
  pingMs: number[],
};

export const SocketPingResultTable = ({pingMs}: Props) => {
  return (
    <>
      <Row className="text-center">
        <Col>
          <Table striped bordered hover responsive variant="dark">
            <thead>
              <tr>
                <th>#</th>
                <th>時長 (毫秒)</th>
              </tr>
            </thead>
            <tbody>
              {pingMs.map((ms, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{ms}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row className="text-end">
        <Col>
          <span className={styles['ping-text']}>
            平均<span className={styles['ping-ms']}>{avg(pingMs).toFixed(2)}</span>毫秒
          </span>
        </Col>
      </Row>
    </>
  );
};
