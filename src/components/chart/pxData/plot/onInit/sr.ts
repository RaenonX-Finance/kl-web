import {ISeriesApi} from 'lightweight-charts';

import {getConfig} from '../../../../../state/config/utils';
import {OnPxChartInitEvent, PxChartLines} from '../../type';
import {getSrLevelGroupColor, srLevelCommonOptions} from '../const';


export const handleSR = (e: OnPxChartInitEvent, price: ISeriesApi<'Candlestick'>): PxChartLines['srLevelLines'] => {
  const {chartDataRef, layoutConfig} = e;

  const srLevelLines: PxChartLines['srLevelLines'] = {};
  const currentPx = chartDataRef.current.data.at(-1);

  if (!currentPx || !getConfig(layoutConfig, 'srLevel')) {
    return {};
  }

  const axisLabelVisible = getConfig(layoutConfig, 'srLevelLabel');

  chartDataRef.current.supportResistance.groups.forEach((group, idxGroup) => {
    srLevelLines[idxGroup] = {};

    group.forEach((level) => {
      srLevelLines[idxGroup][level] = price.createPriceLine({
        axisLabelVisible,
        price: level,
        color: getSrLevelGroupColor(idxGroup),
        ...srLevelCommonOptions,
      });
    });
  });

  return srLevelLines;
};
