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

  const containerCss: React.CSSProperties = {
    position: 'absolute',
    // Set the container size for Px data chart
    left: `${x}px`,
    top: `${y}px`,
    width: `${width}px`,
    height: `${height}px`,
    // Mainly for centering the loading icon
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <div style={containerCss}>
      {
        pxData === null ?
          <Loading/> :
          <React.Suspense fallback={<Loading/>}>
            <PxDataChart
              title={getPxDataTitle(pxData)}
              chartData={pxData}
              payload={{
                customSrLevels: customSrLevels[pxData.contract.symbol],
              }}
              height={height}
              width={width}
            />
          </React.Suspense>
      }
    </div>
  );
};
