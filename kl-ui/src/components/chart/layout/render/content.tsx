import React from 'react';

import {PxUniqueIdentifier} from 'kl-web-common/models/pxMeta';

import {PxLayoutContainerProps} from './container';
import {PxDataError} from './error';
import {useOlderHistoryDataFetcher} from '../../../../hooks/socket/px/historyRequest';
import {useProductDataSelector} from '../../../../state/data/selector';
import {usePxDataSelector} from '../../../../state/pxData/selector';
import {MainLoading} from '../../../common/loading/main';
import {PxDataChart} from '../../pxData/main';


export type PxLayoutContentProps = PxLayoutContainerProps & {
  identifier: PxUniqueIdentifier | null,
};

export const PxLayoutContent = ({slot, height, width, identifier}: PxLayoutContentProps) => {
  const pxData = usePxDataSelector(slot);
  const products = useProductDataSelector();
  const {requestPxData} = useOlderHistoryDataFetcher({slot});

  if (pxData === undefined) {
    return <MainLoading text="資料載入中..."/>;
  }

  if (pxData === null) {
    return <PxDataError identifier={identifier}/>;
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
