import {getLayoutConfig} from '../../../../../state/config/utils';
import {OnPxChartUpdatedEvent} from '../../type';
import {getCurrentChartExtremaPx} from '../utils';


export const handleExtrema = ({chartRef, chartObjectRef, chartData, layoutConfig, user}: OnPxChartUpdatedEvent) => {
  if (!chartRef.current || !chartObjectRef.current) {
    return;
  }

  const {min, max} = chartObjectRef.current.initData.lines.extrema;
  const {minPx, maxPx} = getCurrentChartExtremaPx({
    chart: chartRef.current,
    data: chartData.data,
    price: chartObjectRef.current.initData.series.price,
  });

  if (!minPx) {
    return;
  }

  const inChartExtrema = getLayoutConfig({config: layoutConfig, key: 'inChartExtrema', user});
  const inChartExtremaLabel = getLayoutConfig({config: layoutConfig, key: 'inChartExtremaLabel', user});

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
