import {PxDataEmaPeriodPair} from '../../../../../types/pxData';
import {toCandlestickForFill, toLineData} from '../../dataConvert';
import {OnPxChartInitEvent, PxChartEmaLinePair, PxChartSeries} from '../../type';
import {bearColorForFill, bullColorForFill, emaLineColors} from '../const';
import {getAnimationMode} from '../utils';


export const handleEmaNet = ({
  chartRef,
  chartDataRef,
  layoutConfig,
}: OnPxChartInitEvent): PxChartSeries['emaNet'] => {
  const periods = chartDataRef.current.indicator.ema.net;

  // ------- EMA lines
  const lines = Object.fromEntries(Object.entries(periods).map(([type, period]) => {
    if (!chartRef.current) {
      throw new Error('Adding EMA net lines while the chart is not ready');
    }

    const periodType = type as keyof PxDataEmaPeriodPair;

    const visible = layoutConfig.emaNetLine.enable;
    const emaLine = chartRef.current.addLineSeries({
      color: emaLineColors[periodType],
      title: '',
      lineWidth: 1,
      lastPriceAnimation: getAnimationMode(visible),
      priceLineVisible: false, // Disable vertical Px line
      lastValueVisible: false, // Disable label
      crosshairMarkerVisible: false,
      visible,
    });
    emaLine.setData(chartDataRef.current.data.map(toLineData(`ema${period}`)));

    return [periodType, emaLine];
  })) as PxChartEmaLinePair;

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
      toCandlestickForFill(`ema${periods.slow}`, `ema${periods.fast}`),
    ),
  );

  return {lines, fill};
};
