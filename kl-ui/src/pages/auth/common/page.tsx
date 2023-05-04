import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {AuthErrorParam} from './error';
import {AuthLogo} from './logo';


export const AuthPage = React.memo(({children}: React.PropsWithChildren) => {
  return (
    <Row className="h-100 align-items-center mx-3 mx-md-0">
      <Col md={{span: 6, offset: 3}} lg={{span: 4, offset: 4}}>
        <AuthLogo/>
        <AuthErrorParam/>
        {children}
      </Col>
    </Row>
  );
});

AuthPage.displayName = 'AuthPage';
