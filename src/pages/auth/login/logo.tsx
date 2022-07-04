import React from 'react';

import Image from 'next/image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


export const AuthLoginLogo = () => {
  return (
    <Row className="text-center mb-3">
      <Col>
        <Image alt="Logo" src="/logo.svg" width={150} height={150}/>
      </Col>
    </Row>
  );
};
