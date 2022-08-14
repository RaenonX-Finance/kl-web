import React from 'react';

import Table from 'react-bootstrap/Table';

import {AccountDataMap} from '../../../../../types/admin';
import {AccountActions} from './actions/main';
import {AccountExpiry} from './expiry';
import {AccountFilter} from './filter/main';
import styles from './main.module.scss';
import {AccountPermissionBadges} from './permissionBadges';
import {StatusIcon} from './status/main';
import {AccountFilterConditions, UpdateSingleAccount} from './type';
import {filterAccounts, generatePermissionMap, getAccountRowClassName} from './utils';


type Props = {
  accounts: AccountDataMap,
  updateSingleAccount: UpdateSingleAccount,
};

export const AccountListView = ({accounts, updateSingleAccount}: Props) => {
  const [conditions, setConditions] = React.useState<AccountFilterConditions>({
    expiry: {
      start: null,
      end: null,
    },
    permissions: generatePermissionMap(false),
    status: 'all',
    username: '',
  });

  return (
    <>
      <AccountFilter conditions={conditions} setConditions={setConditions}/>
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
          {filterAccounts(Object.values(accounts), conditions).map((account) => (
            <tr key={account.username} className={getAccountRowClassName(account)}>
              <td className={styles['status-icon']}>
                <StatusIcon account={account}/>
              </td>
              <td className={styles['username']}>
                {account.username}
              </td>
              <td className={styles['expiry']}>
                <AccountExpiry account={account} updateSingleAccount={updateSingleAccount}/>
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
    </>
  );
};
