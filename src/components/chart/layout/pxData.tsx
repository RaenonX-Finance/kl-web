import React from 'react';

import {PxDataIndividual} from '../../../layout/pxData/individual';
import {useCustomSrSelector} from '../../../state/customSr/selector';
import {PxData} from '../../../types/pxData';
import {getPxDataTitle} from '../../../utils/pxData';
import {Loading} from '../../common/loading';


type Props = {
  pxData: PxData | null
};

export const PxDataLayoutPane = ({pxData}: Props) => {
  const customSrLevels = useCustomSrSelector();

  if (pxData === null) {
    return <Loading/>;
  }

  return (
    <PxDataIndividual
      pxData={pxData}
      title={getPxDataTitle(pxData)}
      payload={{
        customSrLevels: customSrLevels[pxData.contract.symbol],
      }}
    />
  );
};
