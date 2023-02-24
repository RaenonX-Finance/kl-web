import {createEmaLine} from './pxLine/ema';
import {OnPxChartInitEvent, PxChartEmaLinePair} from '../../type';
import {getEmaColorOverridder} from '../utils';


export const handleEmaStrongSr = (e: OnPxChartInitEvent): PxChartEmaLinePair[] => {
  const {chartDataRef} = e;

  return chartDataRef.current.indicator.ema.strongSr.map((periodPair) => ({
    fast: createEmaLine({
      e,
      periodType: 'fast',
      periodPair,
      keyOfConfig: 'emaStrongSr',
      keyOfConfigLabel: 'emaStrongSrLabel',
      colorOverride: getEmaColorOverridder(periodPair.fast),
      specialStyleOnSlow: true,
    }),
    slow: createEmaLine({
      e,
      periodType: 'slow',
      periodPair,
      keyOfConfig: 'emaStrongSr',
      keyOfConfigLabel: 'emaStrongSrLabel',
      colorOverride: getEmaColorOverridder(periodPair.slow),
      specialStyleOnSlow: true,
    }),
  }));
};
