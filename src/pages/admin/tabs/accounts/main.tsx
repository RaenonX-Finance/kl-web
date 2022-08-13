import React from 'react';

import {useSession} from 'next-auth/react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {MainLoading} from '../../../../components/common/loading/main';
import {PermissionLayout} from '../../../../components/layout/permission';
import {apiGetAccountList} from '../../../../utils/api/admin';
import {isNotFetched, useFetchState} from '../../../../utils/fetch';
import {AccountTableNoAccount} from './noAccount';
import {AccountListView} from './view/main';


export const AdminTabAccountView = () => {
  const {data} = useSession();
  const {fetchStatus, fetchFunction} = useFetchState(
    [],
    (token: string) => apiGetAccountList({token}),
    'Failed to get account list.',
  );

  if (!data?.user) {
    return <MainLoading/>;
  }

  fetchFunction(data.user.token || '');

  if (isNotFetched(fetchStatus)) {
    return <MainLoading/>;
  }

  const accounts = fetchStatus.data;

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
