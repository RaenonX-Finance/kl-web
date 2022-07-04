import React from 'react';

import {getProviders} from 'next-auth/react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {AuthCustomLoginForm} from './custom';
import {AuthLoginError} from './error';
import {AuthLoginLogo} from './logo';
import {AuthLoginProviders} from './providers';


export type AuthLoginPageProps = {
  providers: UnwrapPromise<ReturnType<typeof getProviders>>,
};

export const AuthLoginPage = ({providers}: AuthLoginPageProps) => {
  return (
    <Row className="h-100 align-items-center mx-3 mx-md-0">
      <Col md={{span: 6, offset: 3}} lg={{span: 4, offset: 4}}>
        <AuthLoginLogo/>
        <AuthLoginError/>
        <AuthCustomLoginForm/>
        <AuthLoginProviders providers={providers}/>
      </Col>
    </Row>
  );
};
