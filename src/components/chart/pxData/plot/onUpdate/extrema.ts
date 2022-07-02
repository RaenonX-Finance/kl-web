import {OnPxChartUpdatedEvent} from '../../type';
import {getCurrentChartExtremaPx} from '../utils';


export const handleExtrema = ({chartRef, chartObjectRef, chartDataRef}: OnPxChartUpdatedEvent) => {
  if (!chartRef.current || !chartObjectRef.current) {
    return;
  }

  const {min, max} = chartObjectRef.current.initData.lines.extrema;
  const {minPx, maxPx} = getCurrentChartExtremaPx({
    chart: chartRef.current,
    data: chartDataRef.current.data,
    price: chartObjectRef.current.initData.series.price,
  });

  min.applyOptions({price: minPx});
  max.applyOptions({price: maxPx});
};
