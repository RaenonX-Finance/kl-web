import {PxData} from 'kl-web-common/models/api/px/pxData';
import {PxDataBar} from 'kl-web-common/models/api/px/pxDataBar';

import {PxChartLegendData} from '../components/chart/pxData/type';


export const updatePxDataBar = (bar: PxDataBar, latestPx: number): PxDataBar => {
  return {
    ...bar,
    high: Math.max(bar.high, latestPx),
    low: Math.min(bar.low, latestPx),
    close: latestPx,
    diff: latestPx - bar.open,
  };
};

export const toLegendData = (data: PxData): PxChartLegendData => {
  const lastHistory = data.data.at(-1);

  const open = lastHistory?.open ?? NaN;
  const close = lastHistory?.close ?? NaN;
  const change = close - open;

  return {
    decimals: data.contract.decimals,
    momentum: data.momentum,
    hovered: false,
    tiePoint: lastHistory?.tiePoint ?? NaN,
    open,
    high: lastHistory?.high ?? NaN,
    low: lastHistory?.low ?? NaN,
    close,
    changeVal: change,
    changePct: (change / open) * 100,
  };
};
