import {getLayoutConfig} from '../../../../../state/config/utils';
import {toCandlestick} from '../../dataConvert';
import {OnPxChartUpdatedEvent} from '../../type';


export const handlePrice = ({chartDataRef, chartObjectRef, layoutConfig, partial}: OnPxChartUpdatedEvent) => {
  if (!chartObjectRef.current) {
    return;
  }

  const {price} = chartObjectRef.current.initData.series;
  const lastPrice = chartDataRef.current.data.at(-1);

  if (!lastPrice) {
    return;
  }

  const {symbol} = chartDataRef.current.contract;
  const title = symbol;

  if (partial) {
    price.update(toCandlestick(getLayoutConfig(layoutConfig, 'candlestickColor'))(lastPrice));
  } else {
    price.setData(chartDataRef.current.data.map(toCandlestick(getLayoutConfig(layoutConfig, 'candlestickColor'))));
  }
  price.applyOptions({title, priceLineVisible: getLayoutConfig(layoutConfig, 'currentPxLine')});
};
