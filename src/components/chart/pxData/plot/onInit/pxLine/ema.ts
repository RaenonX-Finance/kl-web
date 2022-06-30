import {ISeriesApi, LineStyle} from 'lightweight-charts';

import {PxDataEmaPeriodPair} from '../../../../../../types/pxData';
import {toLineData} from '../../../dataConvert';
import {OnPxChartInitEvent, PxChartLayoutConfigKeys} from '../../../type';
import {emaLineColors} from '../../const';
import {ColorOverridder} from '../../type';
import {getAnimationMode} from '../../utils';


type CreateEmaLineOptions = {
  e: OnPxChartInitEvent,
  periodType: keyof PxDataEmaPeriodPair,
  periodPair: PxDataEmaPeriodPair,
  keyOfConfig: PxChartLayoutConfigKeys,
  keyOfConfigLabel: PxChartLayoutConfigKeys,
  colorOverride?: ColorOverridder,
  specialStyleOnSlow?: boolean,
};

const lineStyleMap: {[type in CreateEmaLineOptions['periodType']]: LineStyle} = {
  fast: LineStyle.Solid,
  slow: LineStyle.LargeDashed,
};

export const createEmaLine = ({
  e,
  periodType,
  periodPair,
  keyOfConfig,
  keyOfConfigLabel,
  colorOverride,
  specialStyleOnSlow = false,
}: CreateEmaLineOptions): ISeriesApi<'Line'> => {
  const {chartRef, chartDataRef, layoutConfig} = e;

  if (!chartRef.current) {
    throw new Error('Adding EMA net lines while the chart is not ready');
  }

  const visible = layoutConfig[keyOfConfig].enable;
  const visiableLabel = layoutConfig[keyOfConfigLabel].enable;

  const emaLine = chartRef.current.addLineSeries({
    color: emaLineColors[periodType],
    title: '',
    lineWidth: 1,
    lineStyle: specialStyleOnSlow ? lineStyleMap[periodType] : LineStyle.Solid,
    lastPriceAnimation: getAnimationMode(visible),
    priceLineVisible: false, // Disable vertical Px line
    lastValueVisible: visiableLabel, // Disable label
    crosshairMarkerVisible: false,
    visible,
  });
  emaLine.setData(chartDataRef.current.data.map(toLineData(`ema${periodPair[periodType]}`, colorOverride)));

  return emaLine;
};
