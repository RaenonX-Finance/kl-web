import React from 'react';

import {useRouter} from 'next/router';
import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


export const AuthErrorParam = () => {
  const {query} = useRouter();

  const error = query.error as string;

  if (!error) {
    return <></>;
  }

  return (
    <Row>
      <Col>
        <Alert variant="danger">
          {error}
        </Alert>
      </Col>
    </Row>
  );
};
