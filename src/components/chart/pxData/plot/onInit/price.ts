import {ISeriesApi, LineStyle} from 'lightweight-charts';

import {toCandlestick} from '../../dataConvert';
import {OnPxChartInitEvent} from '../../type';
import {bearColor, bullColor} from '../const';


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
    priceLineWidth: 1,
    priceLineStyle: LineStyle.Solid,
    upColor: bullColor,
    borderUpColor: bullColor,
    wickUpColor: bullColor,
    downColor: bearColor,
    borderDownColor: bearColor,
    wickDownColor: bearColor,
  });
  price.setData(chartDataRef.current.data.map(toCandlestick(layoutConfig.candlestickColor.enable)));

  return price;
};
