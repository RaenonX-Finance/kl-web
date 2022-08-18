import React from 'react';

import {AxiosResponse} from 'axios';
import {useSession} from 'next-auth/react';
import Table from 'react-bootstrap/Table';

import {PermissionLayout} from '../../../../components/layout/permission';
import {errorDispatchers} from '../../../../state/error/dispatchers';
import {ErrorDispatcherName} from '../../../../state/error/types';
import {useDispatch} from '../../../../state/store';
import {FuturesMarketClosedSession} from '../../../../types/admin';
import {apiDeleteMarketClosedSession, apiGetMarketClosedSessions} from '../../../../utils/api/admin';
import {getErrorMessage} from '../../../../utils/error';
import {isNotFetched, useFetchStateProcessed} from '../../../../utils/fetch';
import {ExistingMarketSessionRows} from './existing';
import styles from './main.module.scss';
import {NewMarketSessionRow} from './new';


type State = {
  updating: boolean,
  sessions: FuturesMarketClosedSession[],
};

export const AdminTabMarketSession = () => {
  const {data: session} = useSession();
  const {
    fetchStatus,
    fetchFunction: fetchMarketClosedSessions,
    setFetchStatus,
  } = useFetchStateProcessed<State, AxiosResponse<FuturesMarketClosedSession[]>, string>(
    {updating: false, sessions: []},
    (token: string) => apiGetMarketClosedSessions({token}),
    '無法獲取自訂收市時段。',
    ({data}) => ({updating: false, sessions: data}),
  );
  const dispatch = useDispatch();
  const {updating} = fetchStatus.data;

  if (!session?.user.token) {
    return <></>;
  }

  fetchMarketClosedSessions({payload: session.user.token});

  if (isNotFetched(fetchStatus)) {
    return <></>;
  }

  const onRemove = (sessionId: string) => async () => {
    const token = session.user.token;

    if (!token) {
      dispatch(errorDispatchers[ErrorDispatcherName.UPDATE]({message: '權杖無效，請重新登入。'}));
      return;
    }

    setFetchStatus((fetchStatus) => ({...fetchStatus, data: {...fetchStatus.data, updating: true}}));
    try {
      const sessions = (await apiDeleteMarketClosedSession({
        token,
        session: sessionId,
      })).data;
      setFetchStatus((fetchStatus) => ({...fetchStatus, data: {...fetchStatus.data, sessions}}));
    } catch (err) {
      const message = getErrorMessage({err});
      dispatch(errorDispatchers[ErrorDispatcherName.UPDATE]({message}));
    } finally {
      setFetchStatus((fetchStatus) => ({...fetchStatus, data: {...fetchStatus.data, updating: false}}));
    }
  };

  return (
    <PermissionLayout allowedWithPermissions={['config:session']}>
      <Table responsive variant="dark" className={styles['session-table']}>
        <thead>
          <tr>
            <th>商品英文代號</th>
            <th>收盤時間</th>
            <th>開盤時間</th>
            <th>動作</th>
          </tr>
        </thead>
        <tbody>
          <ExistingMarketSessionRows
            sessions={fetchStatus.data.sessions}
            onRemove={onRemove}
            disableAdd={updating}
          />
          <NewMarketSessionRow
            updateSessions={(sessions) => setFetchStatus((fetchStatus) => ({
              ...fetchStatus,
              data: {...fetchStatus.data, sessions},
            }))}
          />
        </tbody>
      </Table>
    </PermissionLayout>
  );
};
