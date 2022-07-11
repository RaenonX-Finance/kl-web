import {ISeriesApi} from 'lightweight-charts';

import {OnPxChartInitEvent, PxChartLines} from '../../../type';
import {getSrLevelGroupColor, srLevelBasicColor, srLevelBasicCommonOptions, srLevelCommonOptions} from '../../const';
import {handleSrCommon} from './common';


export const handleSR = (e: OnPxChartInitEvent, price: ISeriesApi<'Candlestick'>): PxChartLines['srLevelLines'] => {
  const {chartDataRef} = e;

  const srLevelLines: PxChartLines['srLevelLines'] = {
    basic: {},
    group: {},
  };
  const {basic, groups} = chartDataRef.current.supportResistance;

  // Grouped SR
  groups.forEach((levels, idx) => {
    srLevelLines.group[idx] = handleSrCommon({
      e,
      price,
      keyOfConfig: 'srLevel',
      keyOfConfigLabel: 'srLevelLabel',
      levels,
      color: getSrLevelGroupColor(idx),
      commonOptions: srLevelCommonOptions,
    });
  });

  // Basic SR
  srLevelLines.basic = handleSrCommon({
    e,
    price,
    keyOfConfig: 'srLevel',
    keyOfConfigLabel: 'srLevelLabel',
    levels: basic,
    color: srLevelBasicColor,
    commonOptions: srLevelBasicCommonOptions,
  });

  return srLevelLines;
};
