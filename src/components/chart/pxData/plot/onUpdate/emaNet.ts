import {toCandlestickForFill, toLineData} from '../../dataConvert';
import {OnPxChartUpdatedEvent} from '../../type';
import {getAnimationMode} from '../utils';


export const handleEmaNet = ({chartDataRef, chartObjectRef, layoutConfig}: OnPxChartUpdatedEvent) => {
  const periods = chartDataRef.current.indicator.ema.net;

  if (!chartObjectRef.current) {
    return;
  }

  const series = chartObjectRef.current.initData.series.emaNet;

  const lastPrice = chartDataRef.current.data.at(-1);

  if (!lastPrice) {
    return;
  }

  Object.entries(series.lines).forEach(([key, chartSeries]) => {
    const periodType = key as keyof typeof series.lines;

    const pxLine = toLineData(`ema${periods[periodType]}`)(lastPrice);
    const visible = layoutConfig.emaNetLine.enable;

    chartSeries.update(pxLine);
    chartSeries.applyOptions({visible, lastPriceAnimation: getAnimationMode(visible)});
  });

  series.fill.update(toCandlestickForFill(`ema${periods.slow}`, `ema${periods.fast}`)(lastPrice));
  series.fill.applyOptions({visible: layoutConfig.emaNet.enable});
};
