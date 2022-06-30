import {ISeriesApi} from 'lightweight-charts';

import {PxDataEmaPeriodPair} from '../../../../../../types/pxData';
import {toLineData} from '../../../dataConvert';
import {OnPxChartInitEvent} from '../../../type';
import {emaLineColors} from '../../const';
import {ColorOverridder} from '../../type';
import {getAnimationMode} from '../../utils';


type CreateEmaLineOptions = {
  e: OnPxChartInitEvent,
  periodType: keyof PxDataEmaPeriodPair,
  periodPair: PxDataEmaPeriodPair,
  colorOverride?: ColorOverridder,
};

export const createEmaLine = ({
  e,
  periodType,
  periodPair,
  colorOverride,
}: CreateEmaLineOptions): ISeriesApi<'Line'> => {
  const {chartRef, chartDataRef, layoutConfig} = e;

  if (!chartRef.current) {
    throw new Error('Adding EMA net lines while the chart is not ready');
  }

  const visible = layoutConfig.emaNetLine.enable;
  const emaLine = chartRef.current.addLineSeries({
    color: emaLineColors[periodType],
    title: '',
    lineWidth: 1,
    lastPriceAnimation: getAnimationMode(visible),
    priceLineVisible: false, // Disable vertical Px line
    lastValueVisible: false, // Disable label
    crosshairMarkerVisible: false,
    visible,
  });
  emaLine.setData(chartDataRef.current.data.map(toLineData(`ema${periodPair[periodType]}`, colorOverride)));

  return emaLine;
};
