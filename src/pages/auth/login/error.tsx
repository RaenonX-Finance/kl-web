import React from 'react';

import {useRouter} from 'next/router';
import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


type Props = {
  errorMessage?: string,
};

export const AuthLoginError = ({errorMessage}: Props) => {
  const {query} = useRouter();

  const error = query.error as string || errorMessage;

  if (!error) {
    return <></>;
  }

  return (
    <Row>
      <Col>
        <Alert variant="danger">
          登入失敗: &nbsp;{error}
        </Alert>
      </Col>
    </Row>
  );
};
