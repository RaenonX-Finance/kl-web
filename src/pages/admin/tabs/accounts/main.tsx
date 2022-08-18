import React from 'react';

import {useSession} from 'next-auth/react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {MainLoading} from '../../../../components/common/loading/main';
import {PermissionLayout} from '../../../../components/layout/permission';
import {AccountDataMap} from '../../../../types/admin';
import {apiGetAccountList} from '../../../../utils/api/admin';
import {isNotFetched, useFetchStateProcessed} from '../../../../utils/fetch';
import {AccountTableNoAccount} from './noAccount';
import {AccountListView} from './view/main';
import {UpdateSingleAccount} from './view/type';


export const AdminTabAccountView = () => {
  const {data} = useSession();
  const [autoUpdate, setAutoUpdate] = React.useState(true);
  const {
    fetchStatus,
    fetchFunction: fetchAccountList,
    setFetchStatus,
  } = useFetchStateProcessed(
    {},
    (token: string) => apiGetAccountList({token}),
    '無法獲取帳號清單，請重新登入。',
    ({data}) => (
      Object.fromEntries(data.map((account) => [account.id, account])) as AccountDataMap
    ),
  );

  React.useEffect(() => {
    fetchAccountList({payload: data?.user.token || ''});
  }, []);

  React.useEffect(() => {
    if (!autoUpdate) {
      return;
    }

    const intervalId = setInterval(
      () => fetchAccountList({force: true, payload: data?.user.token || ''}),
      30000,
    );

    return () => clearInterval(intervalId);
  }, [autoUpdate]);

  if (!data?.user || isNotFetched(fetchStatus)) {
    return <MainLoading/>;
  }

  const accounts = fetchStatus.data;
  const updateSingleAccount: UpdateSingleAccount = (account) => {
    setFetchStatus({
      ...fetchStatus,
      data: {
        ...fetchStatus.data,
        [account.id]: account,
      },
    });
  };

  return (
    <PermissionLayout allowedWithPermissions={['account:view']}>
      <Row className="mb-2 text-center">
        <Col>
          {!!accounts ?
            <AccountListView
              accounts={accounts}
              updateSingleAccount={updateSingleAccount}
              lastSuccessEpochMs={fetchStatus.lastSuccessEpochMs}
              setAutoUpdate={setAutoUpdate}
            /> :
            <AccountTableNoAccount/>}
        </Col>
      </Row>
    </PermissionLayout>
  );
};
