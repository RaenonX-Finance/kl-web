import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


export const NarrowLayout = ({children}: React.PropsWithChildren) => {
  return (
    <Row>
      <Col lg={{span: 8, offset: 2}} xl={{span: 6, offset: 3}}>
        {children}
      </Col>
    </Row>
  );
};
