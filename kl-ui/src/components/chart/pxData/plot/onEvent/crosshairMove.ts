import {MouseEventHandler} from 'lightweight-charts';

import {OnPxChartInitEvent, PxChartLegendData} from '../../type';


export const handleCrosshairMove = ({
  chartDataRef,
  setObject,
}: OnPxChartInitEvent): MouseEventHandler => ({
  time,
}) => {
  const data = chartDataRef.current.data;
  const last = data.at(-1);

  const hovered = data.find(({epochSecond}) => epochSecond === time);

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
