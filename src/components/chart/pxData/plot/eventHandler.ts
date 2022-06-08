import {isBusinessDay} from 'lightweight-charts';

import {PxDataBarSmaKey} from '../../../../types/pxData';
import {businessDayToEpochSec} from '../../../../utils/chart';
import {OnPxChartInitEvent} from '../type';


export const handleLegendUpdate = (e: OnPxChartInitEvent) => {
  const {chartRef, chartDataRef, setObject} = e;

  if (!chartRef.current) {
    throw new Error('Legend to be handled while the chart is not ready');
  }

  chartRef.current.subscribeCrosshairMove(({time}) => {
    const pxData = chartDataRef.current.data;

    const last = pxData.at(-1);
    const hovered = pxData.find(({epochSec}) => epochSec === time);

    // Using `last` because moving out of chart makes `lastPrice` undefined
    setObject.legend(({decimals}) => ({
      epochSec: (
        time ?
          (isBusinessDay(time) ? businessDayToEpochSec(time) : time) :
          (last ? last.epochSec : NaN)
      ),
      vwap: hovered?.vwap || last?.vwap || NaN,
      open: hovered?.open || last?.open || NaN,
      high: hovered?.high || last?.high || NaN,
      low: hovered?.low || last?.low || NaN,
      close: hovered?.close || last?.close || NaN,
      diff: hovered?.diff || last?.diff || NaN,
      decimals,
      ...Object.fromEntries(chartDataRef.current.smaPeriods
        .map((period) => {
          const key: PxDataBarSmaKey = `sma${period}`;

          if (hovered) {
            return [key, hovered[key]];
          } else if (last) {
            return [key, last[key]];
          }

          return [key, NaN];
        }),
      ),
    }));
  });
};
