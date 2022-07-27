import {LogicalRangeChangeEventHandler} from 'lightweight-charts';

import {OnPxChartInitEvent} from '../../type';
import {handleXrangeChangeExtrema} from './xRangeChange/extrema';
import {handleXrangeChangeFetchOlder} from './xRangeChange/fetchOlder';


export const handleXrangeChange = (e: OnPxChartInitEvent): LogicalRangeChangeEventHandler => (
  logicalRange,
) => {
  const {chartObjectRef} = e;

  if (!logicalRange || !chartObjectRef.current) {
    return;
  }

  const barsInfo = chartObjectRef.current.initData.series.price.barsInLogicalRange(logicalRange);

  handleXrangeChangeExtrema({e, barsInfo});
  handleXrangeChangeFetchOlder({e, barsInfo});
};
