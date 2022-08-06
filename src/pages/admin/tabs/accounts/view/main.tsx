import React from 'react';

import Table from 'react-bootstrap/Table';

import {Account} from '../main';
import {AccountActions} from './actions/main';
import {AccountExpiry} from './expiry';
import styles from './main.module.scss';
import {AccountPermissionBadges} from './permissionBadges';
import {StatusIcon} from './status/main';
import {getAccountRowClassName} from './utils';


type Props = {
  accounts: Account[],
};

export const AccountListView = ({accounts}: Props) => {
  return (
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
    </Table>
  );
};
