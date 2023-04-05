import React from 'react';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import {SmcTabOptionsOi} from './tabs/optionsOi/main';
import {ProtectedLayout} from '../../../components/layout/protected';


export const SmcAnalysisPanel = () => {
  return (
    <ProtectedLayout>
      <Container className="mt-3">
        <Row>
          <Col xs={1}/>
          <Col>
            <SmcTabOptionsOi/>
          </Col>
          <Col xs={1}/>
        </Row>
      </Container>
    </ProtectedLayout>
  );
};
