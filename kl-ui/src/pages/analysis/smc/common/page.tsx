import React from 'react';

import {AxiosResponse} from 'axios';
import {InfoRequest} from 'kl-web-common/models/api/info/common';
import {DateOnly} from 'kl-web-common/models/dateOnly';
import {toDateOnly} from 'kl-web-common/utils/date';
import {useSession} from 'next-auth/react';
import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {InfoRequestMaker} from './request';
import {SmcPageRenderProps} from './type';
import {MainLoading} from '../../../../components/common/loading/main';
import {errorDispatchers} from '../../../../state/error/dispatchers';
import {ErrorDispatcherName} from '../../../../state/error/types';
import {useDispatch} from '../../../../state/store';
import {ApiRetryableRequestOpts} from '../../../../utils/api/common/types';
import {isNotFetched, useFetchState} from '../../../../utils/fetch';


type SmcPageProps<D, P> = {
  dataName: string,
  initialData: D,
  apiFuncGetData: (payload: P, opts: ApiRetryableRequestOpts) => Promise<AxiosResponse<D>>,
  getPayload: (token: string, request: InfoRequest) => P,
  render: (props: SmcPageRenderProps<D>) => React.ReactNode,
};

export const SmcPage = <D, P>({
  dataName,
  initialData,
  apiFuncGetData,
  getPayload,
  render,
}: SmcPageProps<D, P>) => {
  const {data: session} = useSession();
  const dispatch = useDispatch();
  const [date, setDate] = React.useState<DateOnly>(toDateOnly(new Date()));
  const {
    fetchStatus,
    fetchFunction: fetchData,
    setFetchStatus: setData,
  } = useFetchState<D, P>(
    initialData,
    (payload) => apiFuncGetData(
      payload,
      {
        onRetryAttempt: () => dispatch(errorDispatchers[ErrorDispatcherName.UPDATE]({
          message: `${dataName}要求逾時，重試中...`,
        })),
        onRetrySuccess: () => dispatch(errorDispatchers[ErrorDispatcherName.HIDE_ERROR]()),
      },
    ),
    `無法獲取${dataName}。`,
  );

  const {fetching, fetchError, data} = fetchStatus;
  const token = session?.user.token;

  if (!token) {
    return (
      <Alert variant="warning">
        無法取得使用者權杖，請重新登入後重試。
      </Alert>
    );
  }

  fetchData({payload: getPayload(token, toDateOnly(new Date()))});

  if (isNotFetched(fetchStatus)) {
    return <MainLoading text={`獲取初始${dataName}中...`}/>;
  }

  return (
    <>
      {
        session.user.isAdmin &&
        <Row className="mb-3">
          <Col>
            <InfoRequestMaker
              loading={fetching}
              date={date}
              setDate={setDate}
              fetchFunc={(request) => fetchData({
                force: true,
                payload: getPayload(token, request),
              })}
            />
          </Col>
        </Row>
      }
      {
        fetching ?
          <MainLoading/> :
          fetchError ?
            <Alert variant="danger">
              獲取{dataName}時發生錯誤。
            </Alert> :
            <Row>
              <Col>
                {render({data, date, setData})}
              </Col>
            </Row>
      }
    </>
  );
};
