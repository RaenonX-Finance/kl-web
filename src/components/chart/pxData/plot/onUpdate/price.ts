import {getConfig} from '../../../../../state/config/utils';
import {toCandlestick} from '../../dataConvert';
import {OnPxChartUpdatedEvent} from '../../type';


export const handlePrice = ({chartDataRef, chartObjectRef, layoutConfig}: OnPxChartUpdatedEvent) => {
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

  price.setData(chartDataRef.current.data.map(toCandlestick(getConfig(layoutConfig, 'candlestickColor'))));
  price.applyOptions({title, priceLineVisible: getConfig(layoutConfig, 'currentPxLine')});
};
