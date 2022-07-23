import {getLayoutConfig} from '../../../../../state/config/utils';
import {OnPxChartUpdatedEvent} from '../../type';
import {getCurrentChartExtremaPx} from '../utils';


export const handleExtrema = ({chartRef, chartObjectRef, chartDataRef, layoutConfig}: OnPxChartUpdatedEvent) => {
  if (!chartRef.current || !chartObjectRef.current) {
    return;
  }

  const {min, max} = chartObjectRef.current.initData.lines.extrema;
  const {minPx, maxPx} = getCurrentChartExtremaPx({
    chart: chartRef.current,
    data: chartDataRef.current.data,
    price: chartObjectRef.current.initData.series.price,
  });

  const inChartExtrema = getLayoutConfig(layoutConfig, 'inChartExtrema');
  const inChartExtremaLabel = getLayoutConfig(layoutConfig, 'inChartExtremaLabel');

  min.applyOptions({
    price: minPx,
    lineVisible: inChartExtrema,
    axisLabelVisible: inChartExtremaLabel,
  });
  max.applyOptions({
    price: maxPx,
    lineVisible: inChartExtrema,
    axisLabelVisible: inChartExtremaLabel,
  });
};
