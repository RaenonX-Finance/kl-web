import {getLayoutConfig} from '../../../../../../state/config/utils';
import {toLineData} from '../../../dataConvert';
import {OnPxChartUpdatedEvent} from '../../../type';
import {getAnimationMode} from '../../utils';
import {HandlePxLineOptions} from './type';


export const handlePxLine = (e: OnPxChartUpdatedEvent, opts: HandlePxLineOptions) => {
  const {chartDataRef, chartObjectRef, setObject, layoutConfig, partial} = e;
  const {title, keyOfConfig, keyOfConfigLabel, keyOfSeries, keyOfLegendData, keyForLineData} = opts;

  if (!chartObjectRef.current) {
    return;
  }

  const series = chartObjectRef.current.initData.series[keyOfSeries];

  const lastPrice = chartDataRef.current.data.at(-1);

  if (!lastPrice) {
    return;
  }

  const pxLine = toLineData(keyForLineData)(lastPrice);

  const visible = getLayoutConfig(layoutConfig, keyOfConfig);
  const visibleLabel = getLayoutConfig(layoutConfig, keyOfConfigLabel);

  if (partial) {
    series.update(pxLine);
  } else {
    series.setData(chartDataRef.current.data.map(toLineData(keyForLineData)));
  }

  series.applyOptions({
    visible,
    title: visibleLabel ? title : '',
    lastValueVisible: visibleLabel,
    lastPriceAnimation: getAnimationMode(visible),
  });

  // Whitespace data does not have prop of `value`
  if ('value' in pxLine) {
    setObject.legend((legend) => ({...legend, [keyOfLegendData]: pxLine.value}));
  }
};
