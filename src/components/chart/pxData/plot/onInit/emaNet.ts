import {toCandlestickForFill} from '../../dataConvert';
import {OnPxChartInitEvent, PxChartEmaLinePair, PxChartSeries} from '../../type';
import {bearColorForFill, bullColorForFill} from '../const';
import {createEmaLine} from './pxLine/ema';


export const handleEmaNet = (e: OnPxChartInitEvent): PxChartSeries['emaNet'] => {
  const {chartRef, chartDataRef} = e;
  const periodPair = chartDataRef.current.indicator.ema.net;

  // ------- EMA lines
  const lines: PxChartEmaLinePair = {
    fast: createEmaLine({e, periodType: 'fast', periodPair}),
    slow: createEmaLine({e, periodType: 'slow', periodPair}),
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
  });
  fill.setData(
    chartDataRef.current.data.map(
      toCandlestickForFill(`ema${periodPair.slow}`, `ema${periodPair.fast}`),
    ),
  );

  return {lines, fill};
};
