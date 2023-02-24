import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


export const NarrowLayout = ({children}: React.PropsWithChildren) => {
  return (
    <Row>
      <Col lg={{span: 10, offset: 1}} xl={{span: 8, offset: 2}}>
        {children}
      </Col>
    </Row>
  );
};
