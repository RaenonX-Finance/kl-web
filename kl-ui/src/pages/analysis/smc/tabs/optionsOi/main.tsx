import React from 'react';

import {OptionsOiData} from 'kl-web-common/models/api/info/optionsOi';
import {toDateOnly} from 'kl-web-common/utils/date';
import {useSession} from 'next-auth/react';
import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {OptionsOiChart} from './chart/main';
import {OptionsOiRequestMaker} from './request';
import {OptionsOiFetchPayload} from './type';
import {MainLoading} from '../../../../../components/common/loading/main';
import {apiGetOptionsOi} from '../../../../../utils/api/info/optionsOi';
import {isNotFetched, useFetchState} from '../../../../../utils/fetch';


export const SmcTabOptionsOi = () => {
  const {data: session} = useSession();
  const {
    fetchStatus,
    fetchFunction: fetchOptionsOiData,
  } = useFetchState<OptionsOiData, OptionsOiFetchPayload>(
    [],
    (payload) => apiGetOptionsOi({symbol: 'FITX', ...payload}),
    `無法獲取選擇權 OI 資料。`,
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

  fetchOptionsOiData({payload: {token, ...toDateOnly(new Date())}});

  if (isNotFetched(fetchStatus)) {
    return <MainLoading text="獲取初始選擇權 OI 資料中..."/>;
  }

  return (
    <>
      {
        session.user.isAdmin &&
        <Row className="mb-3">
          <Col>
            <OptionsOiRequestMaker
              loading={fetching}
              fetchOptionsOi={(request) => fetchOptionsOiData({
                force: true,
                payload: {token, ...request},
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
              獲取選擇權 OI 資料時發生錯誤。
            </Alert> :
            <Row>
              <Col>
                <OptionsOiChart data={data}/>
              </Col>
            </Row>
      }
    </>
  );
};
