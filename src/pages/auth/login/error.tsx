import React from 'react';

import {useRouter} from 'next/router';
import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


export const AuthLoginError = () => {
  const {query} = useRouter();

  const errorCode = query.error as string;

  if (!errorCode) {
    return <></>;
  }

  return (
    <Row>
      <Col>
        <Alert variant="danger">
          登入失敗: &nbsp;{errorCode}
        </Alert>
      </Col>
    </Row>
  );
};
