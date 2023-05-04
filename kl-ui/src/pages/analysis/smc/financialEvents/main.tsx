import React from 'react';

import {FinancialEventData} from 'kl-web-common/models/api/info/financialEvents';

import {FinancialEventList} from './eventList/main';
import {FinancialEventsFetchPayload} from './type';
import {apiGetFinancialEvents} from '../../../../utils/api/info/financialEvents';
import {SmcLayout} from '../common/layout';
import {SmcPage} from '../common/page';


export const SmcFinancialEvents = () => {
  return (
    <SmcLayout>
      <SmcPage
        dataName={'財經事件'}
        initialData={[] as FinancialEventData}
        apiFuncGetData={(payload: FinancialEventsFetchPayload, opts) => apiGetFinancialEvents({
          ...opts,
          ...payload,
        })}
        getPayload={(token, date) => ({
          token,
          ...date,
        })}
        render={(data) => <FinancialEventList data={data}/>}
      />
    </SmcLayout>
  );
};
