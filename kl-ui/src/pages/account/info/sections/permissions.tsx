import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {AccountInfoProps} from '../type';


export const AccountPermissions = ({user}: AccountInfoProps) => {
  return (
    <>
      <Row>
        <Col>
          <h5>權限</h5>
        </Col>
      </Row>
      <Row>
        <Col>
          {
            !!user.permissions.length ?
              <ul className="m-0">
                {user.permissions.map((permission) => (
                  <li key={permission}>{permission}</li>
                ))}
              </ul> :
              <>(無)</>
          }
        </Col>
      </Row>
    </>
  );
};
