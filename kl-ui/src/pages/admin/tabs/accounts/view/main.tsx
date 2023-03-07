import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';

import {AccountActions} from './actions/main';
import {AccountExpiry} from './expiry';
import {AccountFilter} from './filter/main';
import styles from './main.module.scss';
import {AccountPermissionBadges} from './permissionBadges';
import {StatusIcon} from './status/main';
import {AccountFilterConditions, UpdateSingleAccount} from './type';
import {filterAccounts, generatePermissionMap, getAccountRowClassName} from './utils';
import {TimeAgo} from '../../../../../components/timeAgo/main';
import {AccountDataMap} from '../../../../../types/admin';
import {FetchStatus} from '../../../../../utils/fetch';


type Props = Pick<FetchStatus<any>, 'lastSuccessEpochMs'> & {
  accounts: AccountDataMap,
  updateSingleAccount: UpdateSingleAccount,
  setAutoUpdate: React.Dispatch<React.SetStateAction<boolean>>,
};

export const AccountListView = ({accounts, updateSingleAccount, lastSuccessEpochMs, setAutoUpdate}: Props) => {
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
      <Row className="text-end">
        <Col>
          <TimeAgo
            epochMs={lastSuccessEpochMs}
            format={(secDiffMs) => <>{`${secDiffMs.toFixed(0)} 秒前更新`}</>}
            updateMs={1000}
          />
        </Col>
      </Row>
      <hr className="my-2"/>
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
                <AccountExpiry
                  account={account}
                  updateSingleAccount={updateSingleAccount}
                  setAutoUpdate={setAutoUpdate}
                />
              </td>
              <td className={styles['permission-badge']}>
                <AccountPermissionBadges account={account}/>
              </td>
              <td className={styles['account-actions']}>
                <AccountActions account={account} updateSingleAccount={updateSingleAccount}/>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};
