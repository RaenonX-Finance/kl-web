import React from 'react';

import {format} from 'date-fns';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';

import {FloatingInput} from '../../../../components/common/form/floating/input';
import {PermissionLayout} from '../../../../components/layout/permission';
import {Permission} from '../../../../types/auth/user';
import styles from './main.module.scss';
import {AdminBadge, permissionBadge} from './permission';
import {StatusIcon} from './status/main';
import {getAccountRowClassName} from './utils';


export type Account = {
  username: string,
  permissions: Permission[],
  expiry: Date | null,
  blocked: boolean,
  admin: boolean,
  online: boolean,
};

const accounts: Account[] = [
  // Active - Normal
  {
    username: 'accountA',
    permissions: ['chart:view'],
    expiry: new Date(2022, 9, 1),
    blocked: false,
    admin: false,
    online: false,
  },
  // Active - Management
  {
    username: 'accountM',
    permissions: ['chart:view', 'permission:add', 'account:view'],
    expiry: new Date(2022, 9, 1),
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
    expiry: new Date(2021, 9, 1),
    blocked: false,
    admin: false,
    online: false,
  },
  // Blocked
  {
    username: 'accountB',
    permissions: ['chart:view'],
    expiry: new Date(2022, 9, 1),
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
              <Table bordered hover responsive variant="dark" className={styles['account-table']}>
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
                  {accounts.map((account) => {
                    const {username, permissions, expiry, blocked, admin} = account;

                    return (
                      <tr key={username} className={getAccountRowClassName(account)}>
                        <td className={styles['status-icon']}>
                          <StatusIcon {...account}/>
                        </td>
                        <td className={styles['username']}>
                          {username}
                        </td>
                        <td>
                          {
                            permissions.includes('account:expiry') ?
                              <FloatingInput
                                type="date"
                                label="帳號過期日"
                                value={expiry || undefined}
                                className="mb-3"
                                required
                              /> :
                              (expiry ? format(expiry, 'yyyy-MM-dd') : '-')
                          }
                        </td>
                        <td className={styles['permission-badge']}>
                          {admin ?
                            <AdminBadge/> :
                            permissions.map((permission) => permissionBadge[permission])}
                        </td>
                        <td>
                          {
                            blocked ?
                              <Button variant="outline-success" size="sm">
                                解鎖
                              </Button> :
                              <Button variant="outline-danger" size="sm">
                                禁用
                              </Button>
                          }
                        </td>
                      </tr>
                    );
                  })}
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
