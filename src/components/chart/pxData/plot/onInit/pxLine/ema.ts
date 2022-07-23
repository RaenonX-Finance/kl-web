import {ISeriesApi, LineStyle} from 'lightweight-charts';

import {getLayoutConfig} from '../../../../../../state/config/utils';
import {PxDataEmaPeriodPair} from '../../../../../../types/pxData';
import {PxLayoutConfigBoolValKeys} from '../../../../config/layout/type';
import {toLineData} from '../../../dataConvert';
import {OnPxChartInitEvent} from '../../../type';
import {emaLineColors} from '../../const';
import {ColorOverridder} from '../../type';
import {getAnimationMode, getPriceFormat} from '../../utils';


type CreateEmaLineOptions = {
  e: OnPxChartInitEvent,
  periodType: keyof PxDataEmaPeriodPair,
  periodPair: PxDataEmaPeriodPair,
  keyOfConfig: PxLayoutConfigBoolValKeys,
  keyOfConfigLabel: PxLayoutConfigBoolValKeys,
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

  const visible = getLayoutConfig(layoutConfig, keyOfConfig);
  const visibleLabel = getLayoutConfig(layoutConfig, keyOfConfigLabel);

  const emaLine = chartRef.current.addLineSeries({
    color: emaLineColors[periodType],
    title: '',
    lineWidth: 1,
    lineStyle: specialStyleOnSlow ? lineStyleMap[periodType] : LineStyle.Solid,
    lastPriceAnimation: getAnimationMode(visible),
    priceLineVisible: false, // Disable vertical Px line
    lastValueVisible: visibleLabel, // Disable label
    crosshairMarkerVisible: false,
    visible,
    priceFormat: getPriceFormat(chartDataRef.current.contract),
  });
  emaLine.setData(chartDataRef.current.data.map(toLineData(`ema${periodPair[periodType]}`, colorOverride)));

  return emaLine;
};
