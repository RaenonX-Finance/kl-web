import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {PermissionLayout} from '../../../../components/layout/permission';
import {Permission} from '../../../../types/auth/user';
import {ISOTimestampWithTimezone} from '../../../../types/time';
import {AccountTableNoAccount} from './noAccount';
import {AccountListView} from './view/main';


export type Account = {
  username: string,
  permissions: Permission[],
  expiry: ISOTimestampWithTimezone | null,
  blocked: boolean,
  admin: boolean,
  online: boolean,
};

const accounts: Account[] = [
  // Active - Normal
  {
    username: 'accountA',
    permissions: ['chart:view'],
    expiry: '2022-09-01T14:48:00.000+00:00',
    blocked: false,
    admin: false,
    online: false,
  },
  // Active - Management
  {
    username: 'accountM',
    permissions: ['chart:view', 'permission:add', 'account:view'],
    expiry: null,
    blocked: false,
    admin: false,
    online: false,
  },
  // Active - Admin
  {
    username: 'accountAd',
    permissions: [],
    expiry: null,
    blocked: false,
    admin: true,
    online: true,
  },
  // Expired
  {
    username: 'accountE',
    permissions: ['chart:view'],
    expiry: '2021-09-01T14:48:00.000+00:00',
    blocked: false,
    admin: false,
    online: false,
  },
  // Blocked
  {
    username: 'accountB',
    permissions: ['chart:view'],
    expiry: '2022-09-01T14:48:00.000+00:00',
    blocked: true,
    admin: false,
    online: false,
  },
];

export const AdminTabAccountView = () => {
  return (
    <PermissionLayout allowedWithPermissions={['account:view']}>
      <Row className="mb-2 text-center">
        <Col>
          {accounts.length > 0 ?
            <AccountListView accounts={accounts}/> :
            <AccountTableNoAccount/>}
        </Col>
      </Row>
    </PermissionLayout>
  );
};
