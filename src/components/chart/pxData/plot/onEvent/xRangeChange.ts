import {LogicalRangeChangeEventHandler} from 'lightweight-charts';

import {OnPxChartInitEvent} from '../../type';
import {getExtremaPxOfRange} from '../utils';


export const handleXrangeChange = ({
  chartObjectRef,
  chartDataRef,
}: OnPxChartInitEvent): LogicalRangeChangeEventHandler => (
  logicalRange,
) => {
  if (!logicalRange || !chartObjectRef.current) {
    return;
  }

  const barsInfo = chartObjectRef.current.initData.series.price.barsInLogicalRange(logicalRange);

  if (!barsInfo) {
    return;
  }

  const {min, max} = chartObjectRef.current.initData.lines.extrema;
  const {minPx, maxPx} = getExtremaPxOfRange(barsInfo, chartDataRef.current.data);

  min.applyOptions({price: minPx});
  max.applyOptions({price: maxPx});
};
