import {HandleXrangeChangeOpts} from './type';
import {getExtremaPxOfRange} from '../../utils';


export const handleXrangeChangeExtrema = ({e, barsInfo}: HandleXrangeChangeOpts) => {
  const {chartObjectRef, chartData} = e;

  if (!barsInfo || !chartObjectRef.current) {
    return;
  }

  const {min, max} = chartObjectRef.current.initData.lines.extrema;
  const {minPx, maxPx} = getExtremaPxOfRange(barsInfo, chartData.data);

  if (!minPx) {
    return;
  }

  min.applyOptions({price: minPx});
  max.applyOptions({price: maxPx});
};
