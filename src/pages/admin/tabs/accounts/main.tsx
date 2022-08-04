import React from 'react';

import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';

import {PermissionLayout} from '../../../../components/layout/permission';
import {Permission} from '../../../../types/auth/user';
import {ISOTimestampWithTimezone} from '../../../../types/time';
import {AccountActions} from './actions/main';
import {AccountExpiry} from './expiry';
import styles from './main.module.scss';
import {AccountPermissionBadges} from './permissionBadges';
import {StatusIcon} from './status/main';
import {getAccountRowClassName} from './utils';


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
          {
            accounts.length > 0 ?
              <Table responsive variant="dark" className={styles['account-table']}>
                <thead>
                  <tr>
                    <th>狀態</th>
                    <th>帳號 ID</th>
                    <th>到期日</th>
                    <th>權限</th>
                    <th>動作</th>
                  </tr>
                </thead>
                <tbody>
                  {accounts.map((account) => (
                    <tr key={account.username} className={getAccountRowClassName(account)}>
                      <td className={styles['status-icon']}>
                        <StatusIcon account={account}/>
                      </td>
                      <td className={styles['username']}>
                        {account.username}
                      </td>
                      <td>
                        <AccountExpiry account={account}/>
                      </td>
                      <td className={styles['permission-badge']}>
                        <AccountPermissionBadges account={account}/>
                      </td>
                      <td className={styles['account-actions']}>
                        <AccountActions account={account}/>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table> :
              <Alert variant="danger">
                <p className="h4 m-0">
                  無可用帳號。
                </p>
              </Alert>
          }
        </Col>
      </Row>
    </PermissionLayout>
  );
};
