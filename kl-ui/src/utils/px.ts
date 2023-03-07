import {PxData} from 'kl-web-common/models/pxData';
import {PxDataBar} from 'kl-web-common/models/pxDataBar';

import {PxChartLegendData} from '../components/chart/pxData/type';


export const updatePxDataBar = (bar: PxDataBar, nextPx: number): PxDataBar => {
  return {
    ...bar,
    high: Math.max(bar.high, nextPx),
    low: Math.min(bar.low, nextPx),
    close: nextPx,
    diff: nextPx - bar.open,
  };
};

export const toLegendData = (data: PxData): PxChartLegendData => {
  const lastHistory = data.data.at(-1);
  const latestMarket = data.latestMarket;

  return {
    decimals: data.contract.decimals,
    momentum: latestMarket.momentum,
    hovered: false,
    tiePoint: lastHistory?.tiePoint ?? NaN,
    open: latestMarket.o,
    high: latestMarket.h,
    low: latestMarket.l,
    close: latestMarket.c,
    changeVal: latestMarket.diffVal,
    changePct: latestMarket.diffPct,
  };
};

export const forceMinTick = (val: number, tick: number): number => {
  return val - val % tick;
};
