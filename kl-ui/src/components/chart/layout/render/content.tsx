import React from 'react';

import {PxLayoutContainerProps} from './container';
import {useOlderHistoryDataFetcher} from '../../../../hooks/socket/px/historyRequest';
import {useProductDataSelector} from '../../../../state/data/selector';
import {usePxDataSelector} from '../../../../state/pxData/selector';
import {MainLoading} from '../../../common/loading/main';
import {PxDataChart} from '../../pxData/main';


export const PxLayoutContent = ({slot, height, width}: PxLayoutContainerProps) => {
  const pxData = usePxDataSelector(slot);
  const products = useProductDataSelector();
  const {requestPxData} = useOlderHistoryDataFetcher({slot});

  if (pxData === undefined) {
    return <MainLoading text="資料載入中..."/>;
  }

  if (pxData === null) {
    // TODO: Target select
    return <></>;
  }

  return (
    <React.Suspense fallback={<MainLoading text="UI 載入中..."/>}>
      <PxDataChart
        title={
          `${products[pxData.contract.symbol]?.name || pxData.contract.symbol} @ ` +
          `${(pxData.periodSec / 60).toFixed(0)}`
        }
        slot={slot}
        chartData={pxData}
        payload={{requestPxData}}
        height={height}
        width={width}
      />
    </React.Suspense>
  );
};
