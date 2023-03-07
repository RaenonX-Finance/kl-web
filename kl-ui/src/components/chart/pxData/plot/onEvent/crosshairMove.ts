import {MouseEventHandler} from 'lightweight-charts';

import {OnPxChartInitEvent, PxChartLegendData} from '../../type';


export const handleCrosshairMove = ({
  chartDataRef,
  setObject,
}: OnPxChartInitEvent): MouseEventHandler => ({
  time,
}) => {
  const pxData = chartDataRef.current.data;
  const latestMarket = chartDataRef.current.latestMarket;
  const last = chartDataRef.current.data.at(-1);

  const hovered = pxData.find(({epochSecond}) => epochSecond === time);

  // Using `last` because moving out of chart makes `lastPrice` undefined
  setObject.legend(({decimals, momentum}) => {
    const legend: PxChartLegendData = {
      decimals,
      momentum,
      open: hovered?.open ?? latestMarket?.o,
      high: hovered?.high ?? latestMarket?.h,
      low: hovered?.low ?? latestMarket?.l,
      close: hovered?.close ?? latestMarket?.c,
      // Diff / Change Val could be 0
      changeVal: hovered?.diff ?? latestMarket?.diffVal,
      changePct: (hovered ? hovered.diff / hovered.open * 100 : null) ?? latestMarket?.diffPct,
      tiePoint: hovered?.tiePoint ?? last?.tiePoint ?? null,
      hovered: !!hovered,
    };

    return legend;
  });
};
