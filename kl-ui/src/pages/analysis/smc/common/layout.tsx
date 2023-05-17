import React from 'react';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import {ProtectedLayout} from '../../../../components/layout/protected';


export const SmcLayout = ({children}: React.PropsWithChildren<{}>) => {
  return (
    <ProtectedLayout>
      <Container className="mt-3">
        <Row>
          <Col md={1}/>
          <Col>
            {children}
          </Col>
          <Col md={1}/>
        </Row>
      </Container>
    </ProtectedLayout>
  );
};
