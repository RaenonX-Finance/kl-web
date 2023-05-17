import React from 'react';

import {OptionsOiData} from 'kl-web-common/models/api/info/optionsOi';

import {OptionsOiChart} from './chart/main';
import {OptionsOiFetchPayload} from './type';
import {apiGetOptionsOi} from '../../../../utils/api/info/optionsOi';
import {SmcLayout} from '../common/layout';
import {SmcPage} from '../common/page';


export const SmcOptionsOi = () => {
  return (
    <SmcLayout>
      <SmcPage
        dataName={'選擇權 OI'}
        initialData={[] as OptionsOiData}
        apiFuncGetData={(payload: OptionsOiFetchPayload, opts) => apiGetOptionsOi({
          symbol: 'FITX',
          ...opts,
          ...payload,
        })}
        getPayload={(token, date) => ({
          symbol: 'FITX',
          token,
          ...date,
        })}
        render={({data}) => <OptionsOiChart data={data}/>}
      />
    </SmcLayout>
  );
};
