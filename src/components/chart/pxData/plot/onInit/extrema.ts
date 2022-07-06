import {ISeriesApi} from 'lightweight-charts';

import {getConfig} from '../../../../../state/config/utils';
import {OnPxChartInitEvent, PxChartExtremaSeries} from '../../type';
import {extremaCommonOptions} from '../const';
import {getCurrentChartExtremaPx} from '../utils';


export const handleExtrema = (e: OnPxChartInitEvent, price: ISeriesApi<'Candlestick'>): PxChartExtremaSeries => {
  const {chartRef, chartDataRef, layoutConfig} = e;

  if (!chartRef.current) {
    throw Error('Attempt to initialize extrema lines but the chart is not ready');
  }

  const {minPx, maxPx} = getCurrentChartExtremaPx({
    chart: chartRef.current,
    data: chartDataRef.current.data,
    price,
  });

  const lineVisible = getConfig(layoutConfig, 'inChartExtrema');
  const axisLabelVisible = lineVisible && getConfig(layoutConfig, 'inChartExtremaLabel');

  return {
    max: price.createPriceLine({
      title: '高',
      price: maxPx,
      lineVisible,
      axisLabelVisible,
      ...extremaCommonOptions,
    }),
    min: price.createPriceLine({
      title: '低',
      price: minPx,
      lineVisible,
      axisLabelVisible,
      ...extremaCommonOptions,
    }),
  };
};
