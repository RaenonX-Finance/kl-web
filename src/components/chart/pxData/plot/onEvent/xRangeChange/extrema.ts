import {getExtremaPxOfRange} from '../../utils';
import {HandleXrangeChangeOpts} from './type';


export const handleXrangeChangeExtrema = ({e, barsInfo}: HandleXrangeChangeOpts) => {
  const {chartObjectRef, chartDataRef} = e;

  if (!barsInfo || !chartObjectRef.current) {
    return;
  }

  const {min, max} = chartObjectRef.current.initData.lines.extrema;
  const {minPx, maxPx} = getExtremaPxOfRange(barsInfo, chartDataRef.current.data);

  if (!minPx) {
    return;
  }

  min.applyOptions({price: minPx});
  max.applyOptions({price: maxPx});
};
