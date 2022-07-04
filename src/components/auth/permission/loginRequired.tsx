import React from 'react';

import {signIn} from 'next-auth/react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

import {CUSTOM_PROVIDER_ID} from '../../../types/auth/const';


export const LoginRequired = () => {
  return (
    <div className="h-100 d-flex flex-column align-items-center justify-content-center">
      <Alert variant="danger">
        <p className="h4">
          此功能需要先登入才可使用。
        </p>
        <hr/>
        <div className="d-flex justify-content-end">
          {/* Specify provider `KL-Site` do directly go to the webpage with providers and default login */}
          <Button variant="outline-danger" onClick={() => signIn(CUSTOM_PROVIDER_ID)}>
            點此登入
          </Button>
        </div>
      </Alert>
    </div>
  );
};
