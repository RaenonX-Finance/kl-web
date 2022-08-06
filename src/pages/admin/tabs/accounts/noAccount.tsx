import React from 'react';

import Alert from 'react-bootstrap/Alert';


export const AccountTableNoAccount = () => {
  return (
    <Alert variant="danger">
      <p className="h4 m-0">
        無可用帳號。
      </p>
    </Alert>
  );
};
