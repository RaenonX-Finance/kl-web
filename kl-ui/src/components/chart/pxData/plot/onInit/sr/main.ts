import {ISeriesApi} from 'lightweight-charts';

import {handleSrCommon} from './common';
import {OnPxChartInitEvent, PxChartLines} from '../../../type';
import {getSrLevelColor, srLevelCommonOptions} from '../../const';


export const handleSR = (e: OnPxChartInitEvent, price: ISeriesApi<'Candlestick'>): PxChartLines['srLevelLines'] => {
  const {chartDataRef} = e;

  const srLevelLines: PxChartLines['srLevelLines'] = {};

  chartDataRef.current.supportResistance.forEach((levels, idx) => {
    srLevelLines[idx] = handleSrCommon({
      e,
      price,
      keyOfConfig: 'srLevel',
      keyOfConfigLabel: 'srLevelLabel',
      levels,
      color: getSrLevelColor(idx),
      commonOptions: srLevelCommonOptions,
    });
  });

  return srLevelLines;
};
