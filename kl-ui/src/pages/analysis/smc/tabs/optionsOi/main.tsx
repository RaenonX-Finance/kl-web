import React from 'react';

import {OptionsOiData} from 'kl-web-common/models/api/info/optionsOi';
import {toDateOnly} from 'kl-web-common/utils/date';
import {useSession} from 'next-auth/react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {OptionsOiChart} from './chart';
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
  const {fetching, data} = fetchStatus;
  const token = session?.user.token;

  if (!token) {
    return <></>;
  }

  fetchOptionsOiData({payload: {token, ...toDateOnly(new Date())}});

  if (isNotFetched(fetchStatus)) {
    return <></>;
  }

  return (
    <>
      <Row>
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
      <hr/>
      {
        fetching ?
          <MainLoading/> :
          <Row>
            <Col>
              <OptionsOiChart data={data}/>
            </Col>
          </Row>
      }
    </>
  );
};
