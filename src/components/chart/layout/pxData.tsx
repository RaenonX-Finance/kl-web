import React from 'react';

import {useCustomSrSelector} from '../../../state/customSr/selector';
import {usePxDataSelector} from '../../../state/pxData/selector';
import {PxDataMapSlotNames} from '../../../types/pxData';
import {getPxDataTitle} from '../../../utils/pxData';
import {Loading} from '../../common/loading';
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
              slot={slot}
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
