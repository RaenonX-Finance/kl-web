import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {AccountUserIcon} from './userIcon';
import {AccountInfoProps} from '../type';


export const AccountId = React.memo(({user}: AccountInfoProps) => {
  return (
    <Row>
      <Col>
        <span className="h2">
          <AccountUserIcon user={user}/>&nbsp;{user.username}
        </span>
      </Col>
      <Col className="text-end align-self-end">
        <code className="text-info">
          {user.id}
        </code>
      </Col>
    </Row>
  );
});

AccountId.displayName = 'AccountId';
