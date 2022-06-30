import {ISeriesApi} from 'lightweight-charts';

import {PxDataBar, PxDataEmaPeriodPair} from '../../../../../../types/pxData';
import {toLineData} from '../../../dataConvert';
import {OnPxChartUpdatedEvent, PxChartLayoutConfigKeys} from '../../../type';
import {ColorOverridder} from '../../type';
import {getAnimationMode} from '../../utils';


type UpdateEmaOptions = {
  e: OnPxChartUpdatedEvent,
  series: ISeriesApi<'Line'>,
  periodType: keyof PxDataEmaPeriodPair,
  periodPair: PxDataEmaPeriodPair,
  keyofConfig: PxChartLayoutConfigKeys,
  lastPx: PxDataBar,
  colorOverride?: ColorOverridder,
};

export const updateEma = ({
  e,
  series,
  periodType,
  periodPair,
  keyofConfig,
  lastPx,
  colorOverride,
}: UpdateEmaOptions) => {
  const {layoutConfig} = e;

  const pxLine = toLineData(`ema${periodPair[periodType]}`, colorOverride)(lastPx);
  const configBody = layoutConfig[keyofConfig];

  if (!configBody) {
    throw Error(`Config key [${keyofConfig}] not found`);
  }

  const visible = layoutConfig[keyofConfig].enable;

  series.update(pxLine);
  series.applyOptions({visible, lastPriceAnimation: getAnimationMode(visible)});
};
