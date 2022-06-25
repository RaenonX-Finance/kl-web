import React from 'react';

import {useCustomSrSelector} from '../../../state/customSr/selector';
import {PxData} from '../../../types/pxData';
import {getPxDataTitle} from '../../../utils/pxData';
import {Loading} from '../../common/loading';
import {PxDataChart} from '../pxData/main';


type Props = {
  pxData: PxData | null
};

export const PxDataLayoutPane = ({pxData}: Props) => {
  const customSrLevels = useCustomSrSelector();

  if (pxData === null) {
    return <Loading/>;
  }

  return (
    <PxDataChart
      title={getPxDataTitle(pxData)}
      chartData={pxData}
      payload={{
        customSrLevels: customSrLevels[pxData.contract.symbol],
      }}
    />
  );
};
