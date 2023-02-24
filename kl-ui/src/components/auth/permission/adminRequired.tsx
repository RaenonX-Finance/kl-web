import React from 'react';

import Alert from 'react-bootstrap/Alert';


export const AdminRequired = () => {
  return (
    <div className="h-100 d-flex flex-column align-items-center justify-content-center">
      <Alert variant="danger">
        <p className="h4 m-0">
          此功能需要管理員權限才可使用。
        </p>
      </Alert>
    </div>
  );
};
