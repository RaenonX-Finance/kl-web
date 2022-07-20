import {ISeriesApi, LineStyle} from 'lightweight-charts';

import {getConfig} from '../../../../../state/config/utils';
import {toCandlestick} from '../../dataConvert';
import {OnPxChartInitEvent} from '../../type';
import {bearColor, bullColor, currentPxColor} from '../const';
import {getPriceFormat} from '../utils';


export const handlePrice = ({
  chartRef, chartDataRef, layoutConfig,
}: OnPxChartInitEvent): ISeriesApi<'Candlestick'> => {
  if (!chartRef.current) {
    throw new Error('Adding price while the chart is not ready');
  }

  const {contract, data} = chartDataRef.current;

  const price = chartRef.current.addCandlestickSeries({
    title: contract.symbol,
    priceLineVisible: getConfig(layoutConfig, 'currentPxLine'),
    priceLineWidth: 1,
    priceLineStyle: LineStyle.Dotted,
    upColor: bullColor,
    borderUpColor: bullColor,
    wickUpColor: bullColor,
    downColor: bearColor,
    borderDownColor: bearColor,
    wickDownColor: bearColor,
    priceLineColor: currentPxColor,
    priceFormat: getPriceFormat(contract),
  });
  price.setData(data.map(toCandlestick(getConfig(layoutConfig, 'candlestickColor'))));

  return price;
};
