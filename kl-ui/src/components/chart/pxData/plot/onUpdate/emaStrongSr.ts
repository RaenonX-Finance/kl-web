import {PxEmaPeriodPair} from 'kl-web-common/models/config/emaPair';

import {updateEma} from './pxLine/ema';
import {OnPxChartUpdatedEvent} from '../../type';
import {getEmaColorOverridder} from '../utils';


export const handleEmaStrongSr = (e: OnPxChartUpdatedEvent) => {
  const {chartDataRef, chartObjectRef} = e;

  chartDataRef.current.indicator.ema.strongSr.forEach((periodPair, idx) => {
    if (!chartObjectRef.current) {
      return;
    }

    const seriesCollection = chartObjectRef.current.initData.series.emaStrongSr;

    const lastPx = chartDataRef.current.data.at(-1);

    if (!lastPx) {
      return;
    }

    Object.entries(seriesCollection[idx]).map(([key, series]) => {
      const periodType = key as keyof PxEmaPeriodPair;

      updateEma({
        e,
        series,
        periodType,
        periodPair,
        keyofConfig: 'emaStrongSr',
        keyOfConfigLabel: 'emaStrongSrLabel',
        lastPx,
        colorOverride: getEmaColorOverridder(periodPair[periodType]),
      });
    });
  });
};
