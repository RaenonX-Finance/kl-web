import {ISeriesApi, LineStyle} from 'lightweight-charts';

import {toCandlestick} from '../../dataConvert';
import {OnPxChartInitEvent} from '../../type';
import {bearColor, bullColor, currentPxColor} from '../const';


export const handlePrice = ({
  chartRef, chartDataRef, layoutConfig,
}: OnPxChartInitEvent): ISeriesApi<'Candlestick'> => {
  if (!chartRef.current) {
    throw new Error('Adding price while the chart is not ready');
  }

  const price = chartRef.current.addCandlestickSeries({
    title: chartDataRef.current.contract.symbol,
    priceFormat: {
      minMove: chartDataRef.current.contract.minTick,
    },
    priceLineVisible: layoutConfig.currentPxLine,
    priceLineWidth: 1,
    priceLineStyle: LineStyle.Dotted,
    upColor: bullColor,
    borderUpColor: bullColor,
    wickUpColor: bullColor,
    downColor: bearColor,
    borderDownColor: bearColor,
    wickDownColor: bearColor,
    priceLineColor: currentPxColor,
  });
  price.setData(chartDataRef.current.data.map(toCandlestick(layoutConfig.candlestickColor)));

  return price;
};
