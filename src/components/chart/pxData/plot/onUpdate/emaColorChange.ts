import {PxDataEmaPeriodPair} from '../../../../../types/pxData';
import {OnPxChartUpdatedEvent} from '../../type';
import {makeEmaColorChangeKey} from '../../utils';
import {getEmaColorOverridder} from '../utils';
import {updateEma} from './pxLine/ema';


export const handleEmaColorChange = (e: OnPxChartUpdatedEvent) => {
  const {chartDataRef, chartObjectRef} = e;
  const periods = chartDataRef.current.indicator.ema.colorChange;

  periods.forEach((periodPair) => {
    const emaColorChangeKey = makeEmaColorChangeKey(periodPair);

    if (!chartObjectRef.current) {
      return;
    }

    const series = chartObjectRef.current.initData.series[emaColorChangeKey];

    if (!series) {
      throw Error(`Color changing EMA of key [${emaColorChangeKey}] does not have corresponding series`);
    }

    const lastPx = chartDataRef.current.data.at(-1);

    if (!lastPx) {
      return;
    }

    Object.entries(series).forEach(([key, chartSeries]) => {
      const periodType = key as keyof PxDataEmaPeriodPair;

      updateEma({
        e,
        series: chartSeries,
        periodType,
        periodPair,
        keyofConfig: emaColorChangeKey,
        lastPx,
        colorOverride: getEmaColorOverridder(periodPair[periodType]),
      });
    });
  });
};
