import {ISeriesApi} from 'lightweight-charts';

import {OnPxChartInitEvent, PxChartLines} from '../../type';
import {getSrLevelGroupColor, srLevelLineStyle, srLevelLineWidth} from '../const';


export const handleSR = (e: OnPxChartInitEvent, price: ISeriesApi<'Candlestick'>): PxChartLines['srLevelLines'] => {
  const {chartDataRef, layoutConfig} = e;

  const srLevelLines: PxChartLines['srLevelLines'] = {};
  const currentPx = chartDataRef.current.data.at(-1);

  if (!currentPx || !layoutConfig.srLevel) {
    return {};
  }

  chartDataRef.current.supportResistance.groups.forEach((group, idxGroup) => {
    srLevelLines[idxGroup] = {};

    group.forEach((level) => {
      srLevelLines[idxGroup][level] = price.createPriceLine({
        title: '',
        axisLabelVisible: true,
        price: level,
        color: getSrLevelGroupColor(idxGroup),
        lineVisible: true,
        lineStyle: srLevelLineStyle,
        lineWidth: srLevelLineWidth,
      });
    });
  });

  return srLevelLines;
};
