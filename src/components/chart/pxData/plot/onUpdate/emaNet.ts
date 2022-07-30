import {getLayoutConfig} from '../../../../../state/config/utils';
import {PxDataEmaPeriodPair} from '../../../../../types/pxData';
import {toCandlestickForFill} from '../../dataConvert';
import {OnPxChartUpdatedEvent} from '../../type';
import {updateEma} from './pxLine/ema';


export const handleEmaNet = (e: OnPxChartUpdatedEvent) => {
  const {chartDataRef, chartObjectRef, layoutConfig, partial} = e;
  const periodPair = chartDataRef.current.indicator.ema.net;

  if (!chartObjectRef.current) {
    return;
  }

  const series = chartObjectRef.current.initData.series.emaNet;

  const lastPx = chartDataRef.current.data.at(-1);

  if (!lastPx) {
    return;
  }

  Object.entries(series.lines).forEach(([key, chartSeries]) => {
    updateEma({
      e,
      series: chartSeries,
      periodType: key as keyof PxDataEmaPeriodPair,
      periodPair,
      keyofConfig: 'emaNet',
      keyOfConfigLabel: 'emaNetLabel',
      lastPx,
    });
  });

  if (partial) {
    series.fill.update(toCandlestickForFill(`ema${periodPair.slow}`, `ema${periodPair.fast}`)(lastPx));
  } else {
    series.fill.setData(chartDataRef.current.data.map(
      toCandlestickForFill(`ema${periodPair.slow}`, `ema${periodPair.fast}`),
    ));
  }
  series.fill.applyOptions({visible: getLayoutConfig(layoutConfig, 'emaNet')});
};
