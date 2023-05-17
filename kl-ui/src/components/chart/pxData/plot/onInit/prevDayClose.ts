import {ISeriesApi, LineStyle} from 'lightweight-charts';

import {getLayoutConfig} from '../../../../../state/config/utils';
import {OnPxChartInitEvent, PxChartLines} from '../../type';
import {prevDayCloseColor} from '../const';


export const handlePrevDayClose = (
  e: OnPxChartInitEvent,
  price: ISeriesApi<'Candlestick'>,
): PxChartLines['prevDayClose'] => {
  const {chartDataRef, layoutConfig, user} = e;

  const latestMarket = chartDataRef.current.latestMarket;

  const axisLabelVisible = getLayoutConfig({config: layoutConfig, key: 'prevDayCloseLabel', user});
  const lineVisible = getLayoutConfig({config: layoutConfig, key: 'prevDayClose', user});

  return price.createPriceLine({
    axisLabelVisible,
    lineVisible,
    price: latestMarket?.o ?? NaN,
    color: prevDayCloseColor,
    lineStyle: LineStyle.LargeDashed,
  });
};
