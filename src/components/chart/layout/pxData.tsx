import React from 'react';

import {useCustomSrSelector} from '../../../state/customSr/selector';
import {PxData} from '../../../types/pxData';
import {getPxDataTitle} from '../../../utils/pxData';
import {Loading} from '../../common/loading';
import {PxDataChart} from '../pxData/main';


type Props = {
  pxData: PxData | null,
  width: number,
  height: number,
  x: number,
  y: number,
};

export const PxDataLayoutPane = ({pxData, width, height, x, y}: Props) => {
  const customSrLevels = useCustomSrSelector();

  if (pxData === null) {
    return <Loading/>;
  }

  return (
    <div style={{position: 'absolute', left: `${x}px`, top: `${y}px`}}>
      <PxDataChart
        title={getPxDataTitle(pxData)}
        chartData={pxData}
        payload={{
          customSrLevels: customSrLevels[pxData.contract.symbol],
        }}
        height={height}
        width={width}
      />
    </div>
  );
};
