import React from 'react';

import Alert from 'react-bootstrap/Alert';

import {Permission} from '../../../types/auth/user';


type Props = {
  allowedPermissions: Permission[],
};

export const InsufficientPermission = ({allowedPermissions}: Props) => {
  return (
    <div className="h-100 d-flex flex-column align-items-center justify-content-center">
      <Alert variant="danger">
        <p className="h4">
          權限不足。無法使用此功能。
        </p>
        <hr/>
        所需任一權限:
        <ul className="m-0">
          {allowedPermissions.map((permission) => <li key={permission}>{permission}</li>)}
        </ul>
      </Alert>
    </div>
  );
};
