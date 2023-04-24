import {PxEmaPeriodPair} from 'kl-web-common/models/config/emaPair';

import {updateEma} from './pxLine/ema';
import {getLayoutConfig} from '../../../../../state/config/utils';
import {toCandlestickForFill} from '../../dataConvert';
import {OnPxChartUpdatedEvent} from '../../type';


export const handleEmaNet = (e: OnPxChartUpdatedEvent) => {
  const {chartDataRef, chartObjectRef, layoutConfig, partial, user} = e;
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
      periodType: key as keyof PxEmaPeriodPair,
      periodPair,
      keyOfConfig: 'emaNet',
      keyOfConfigLabel: 'emaNetLabel',
      lastPx,
    });
  });

  if (partial) {
    series.fill.update(
      toCandlestickForFill(
        (bar) => bar.ema[periodPair.slow],
        (bar) => bar.ema[periodPair.fast],
      )(lastPx),
    );
  } else {
    series.fill.setData(chartDataRef.current.data.map(
      toCandlestickForFill(
        (bar) => bar.ema[periodPair.slow],
        (bar) => bar.ema[periodPair.fast],
      ),
    ));
  }
  series.fill.applyOptions({visible: getLayoutConfig({config: layoutConfig, key: 'emaNet', user})});
};
