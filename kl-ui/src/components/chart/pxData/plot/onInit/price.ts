import {ISeriesApi, LineStyle} from 'lightweight-charts';

import {getLayoutConfig} from '../../../../../state/config/utils';
import {toCandlestick} from '../../dataConvert';
import {OnPxChartInitEvent} from '../../type';
import {bearColor, bullColor, currentPxColor} from '../const';
import {getPriceFormat} from '../utils';


export const handlePrice = ({
  chartRef, chartData, layoutConfig, user,
}: OnPxChartInitEvent): ISeriesApi<'Candlestick'> => {
  if (!chartRef.current) {
    throw new Error('Adding price while the chart is not ready');
  }

  const {contract, data} = chartData;

  const price = chartRef.current.addCandlestickSeries({
    title: contract.symbol,
    priceLineVisible: getLayoutConfig({config: layoutConfig, key: 'currentPxLine', user}),
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
  price.setData(
    data.map(
      toCandlestick(
        getLayoutConfig({config: layoutConfig, key: 'candlestickColor', user}),
      ),
    ),
  );

  return price;
};
