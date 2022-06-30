import {OnPxChartInitEvent, PxChartEmaLinePair, PxChartSeriesEmaColorChange} from '../../type';
import {makeEmaColorChangeKey} from '../../utils';
import {getEmaColorOverridder} from '../utils';
import {createEmaLine} from './pxLine/ema';


export const handleEmaColorChange = (e: OnPxChartInitEvent): PxChartSeriesEmaColorChange => {
  const {chartDataRef} = e;
  const periods = chartDataRef.current.indicator.ema.colorChange;

  // ------- EMA lines
  return Object.fromEntries(periods.map((periodPair) => {
    const seriesPair: PxChartEmaLinePair = {
      fast: createEmaLine({
        e,
        periodType: 'fast',
        periodPair,
        colorOverride: getEmaColorOverridder(periodPair.fast),
      }),
      slow: createEmaLine({
        e,
        periodType: 'slow',
        periodPair,
        colorOverride: getEmaColorOverridder(periodPair.slow),
      }),
    };

    return [makeEmaColorChangeKey(periodPair), seriesPair];
  }));
};
