import {getLayoutConfig} from '../../../../../state/config/utils';
import {toCandlestick} from '../../dataConvert';
import {OnPxChartUpdatedEvent} from '../../type';


export const handlePrice = ({chartData, chartObjectRef, layoutConfig, partial, user}: OnPxChartUpdatedEvent) => {
  if (!chartObjectRef.current) {
    return;
  }

  const {price} = chartObjectRef.current.initData.series;
  const lastPrice = chartData.data.at(-1);

  if (!lastPrice) {
    return;
  }

  const {symbol} = chartData.contract;
  const title = symbol;
  const fnToCandlestick = toCandlestick(
    getLayoutConfig({config: layoutConfig, key: 'candlestickColor', user}),
  );

  if (partial) {
    price.update(fnToCandlestick(lastPrice));
  } else {
    price.setData(chartData.data.map(fnToCandlestick));
  }
  price.applyOptions({
    title,
    priceLineVisible: getLayoutConfig({config: layoutConfig, key: 'currentPxLine', user}),
  });
};
