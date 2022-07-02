import React from 'react';

import Col from 'react-bootstrap/Col';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';

import {getProgressText} from '../../utils/text';


type Props = {
  pingCount: number,
  pingCountMax: number,
};

export const SocketPingProgressBar = ({pingCount, pingCountMax}: Props) => {
  return (
    <>
      <Row className="text-center mb-2">
        <Col>
          {pingCount !== pingCountMax && <Spinner size="sm" animation="border" className="me-2"/>}
          {getProgressText(pingCount, pingCountMax)}
        </Col>
      </Row>
      <Row>
        <Col>
          <ProgressBar min={0} max={pingCountMax} now={pingCount} variant="info"/>
        </Col>
      </Row>
    </>
  );
};
