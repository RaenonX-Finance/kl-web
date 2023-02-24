import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';

import {PING_TEST_COUNT} from './const';
import styles from './main.module.scss';
import {SocketPingProgressBar} from './pingProgressBar';
import {avg} from '../../utils/calc';


type Props = {
  pingCount: number,
  pingMs: number[],
};

export const SocketPingResult = ({pingCount, pingMs}: Props) => {
  const avgPing = avg(pingMs);

  return (
    <>
      <Row className="mb-2 text-center">
        <Col>
          <Table striped bordered hover responsive variant="dark">
            <thead>
              <tr>
                <th>#</th>
                <th>時長 (毫秒)</th>
              </tr>
            </thead>
            {
              pingMs.length > 0 &&
              <tbody>
                {pingMs.map((ms, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{ms}</td>
                  </tr>
                ))}
              </tbody>
            }
          </Table>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <SocketPingProgressBar pingCount={pingCount} pingCountMax={PING_TEST_COUNT}/>
        </Col>
      </Row>
      <Row className="text-end">
        <Col>
          <span className={styles['ping-text']}>
            平均
            <span className={styles['ping-ms']}>{isNaN(avgPing) ? '-' : avgPing.toFixed(2)}</span>
            毫秒
          </span>
        </Col>
      </Row>
    </>
  );
};
