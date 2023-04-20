import {createEmaLine} from './pxLine/ema';
import {toCandlestickForFill} from '../../dataConvert';
import {OnPxChartInitEvent, PxChartEmaLinePair, PxChartSeries} from '../../type';
import {bearColorForFill, bullColorForFill} from '../const';
import {getPriceFormat} from '../utils';


export const handleEmaNet = (e: OnPxChartInitEvent): PxChartSeries['emaNet'] => {
  const {chartRef, chartData} = e;
  const periodPair = chartData.indicator.ema.net;

  // ------- EMA lines
  const lines: PxChartEmaLinePair = {
    fast: createEmaLine({
      e,
      periodType: 'fast',
      periodPair,
      keyOfConfig: 'emaNet',
      keyOfConfigLabel: 'emaNetLabel',
    }),
    slow: createEmaLine({
      e,
      periodType: 'slow',
      periodPair,
      keyOfConfig: 'emaNet',
      keyOfConfigLabel: 'emaNetLabel',
    }),
  };

  // ------- EMA fill
  if (!chartRef.current) {
    throw new Error('Adding EMA net fill while the chart is not ready');
  }

  const fill = chartRef.current.addCandlestickSeries({
    title: '',
    priceLineVisible: false,
    lastValueVisible: false,
    upColor: bullColorForFill,
    borderUpColor: bullColorForFill,
    wickUpColor: bullColorForFill,
    downColor: bearColorForFill,
    borderDownColor: bearColorForFill,
    wickDownColor: bearColorForFill,
    priceFormat: getPriceFormat(chartData.contract),
  });
  fill.setData(
    chartData.data.map(
      toCandlestickForFill(
        (bar) => bar.ema[periodPair.slow],
        (bar) => bar.ema[periodPair.fast],
      ),
    ),
  );

  return {lines, fill};
};
