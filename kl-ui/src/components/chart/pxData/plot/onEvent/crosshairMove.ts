import {MouseEventHandler} from 'lightweight-charts';

import {OnPxChartInitEvent, PxChartLegendData} from '../../type';


export const handleCrosshairMove = ({
  chartData,
  setObject,
}: OnPxChartInitEvent): MouseEventHandler => ({
  time,
}) => {
  const pxData = chartData.data;
  const last = chartData.data.at(-1);

  const hovered = pxData.find(({epochSecond}) => epochSecond === time);

  // Using `last` because moving out of chart makes `lastPrice` undefined
  setObject.legend(({decimals, momentum}) => {
    const legend: PxChartLegendData = {
      decimals,
      momentum,
      open: hovered?.open ?? last?.open ?? NaN,
      high: hovered?.high ?? last?.high ?? NaN,
      low: hovered?.low ?? last?.low ?? NaN,
      close: hovered?.close ?? last?.close ?? NaN,
      changeVal: hovered?.diff ?? last?.diff ?? NaN,
      changePct:
        (hovered ? hovered.diff / hovered.open * 100 : null) ??
        (last ? last.diff / last.open * 100 : null) ??
        NaN,
      tiePoint: hovered?.tiePoint ?? last?.tiePoint ?? null,
      hovered: !!hovered,
    };

    return legend;
  });
};
