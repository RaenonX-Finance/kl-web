import React from 'react';

import {useCustomSrSelector} from '../../../state/customSr/selector';
import {useProductDataSelector} from '../../../state/data/selector';
import {usePxDataSelector} from '../../../state/pxData/selector';
import {PxDataMapSlotNames} from '../../../types/pxData';
import {MainLoading} from '../../common/loading/main';
import {PxDataChart} from '../pxData/main';


type Props = {
  slot: PxDataMapSlotNames,
  width: number,
  height: number,
  x: number,
  y: number,
};

export const PxDataLayoutPane = ({slot, width, height, x, y}: Props) => {
  const pxData = usePxDataSelector(slot);
  const products = useProductDataSelector();
  const customSrLevels = useCustomSrSelector(pxData?.contract.symbol) || [];

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
          <MainLoading/> :
          <React.Suspense fallback={<MainLoading/>}>
            <PxDataChart
              title={
                `${products[pxData.contract.symbol]?.name || pxData.contract.symbol} @ ` +
                `${(pxData.periodSec / 60).toFixed(0)}`
              }
              slot={slot}
              chartData={pxData}
              payload={{customSrLevels}}
              height={height}
              width={width}
            />
          </React.Suspense>
      }
    </div>
  );
};
