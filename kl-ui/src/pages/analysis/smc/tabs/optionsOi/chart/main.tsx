import React from 'react';

import {OptionsOiData} from 'kl-web-common/models/api/info/optionsOi';

import {OptionsOiChartSingle} from './single';


type Props = {
  data: OptionsOiData
};

export const OptionsOiChart = ({data}: Props) => {
  return (
    <>
      {data.map((dataOfContract) => (
        <OptionsOiChartSingle key={dataOfContract.contractSymbol} data={dataOfContract}/>
      ))}
    </>
  );
};
