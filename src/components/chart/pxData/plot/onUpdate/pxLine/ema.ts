import {ISeriesApi} from 'lightweight-charts';

import {getLayoutConfig} from '../../../../../../state/config/utils';
import {PxDataBar, PxDataEmaPeriodPair} from '../../../../../../types/pxData';
import {toLineData} from '../../../dataConvert';
import {OnPxChartUpdatedEvent, PxLayoutConfigBoolValKeys} from '../../../type';
import {ColorOverridder} from '../../type';
import {getAnimationMode} from '../../utils';


type UpdateEmaOptions = {
  e: OnPxChartUpdatedEvent,
  series: ISeriesApi<'Line'>,
  periodType: keyof PxDataEmaPeriodPair,
  periodPair: PxDataEmaPeriodPair,
  keyofConfig: PxLayoutConfigBoolValKeys,
  keyOfConfigLabel: PxLayoutConfigBoolValKeys,
  lastPx: PxDataBar,
  colorOverride?: ColorOverridder,
};

export const updateEma = ({
  e,
  series,
  periodType,
  periodPair,
  keyofConfig,
  keyOfConfigLabel,
  lastPx,
  colorOverride,
}: UpdateEmaOptions) => {
  const {layoutConfig} = e;

  const pxLine = toLineData(`ema${periodPair[periodType]}`, colorOverride)(lastPx);
  const visible = getLayoutConfig(layoutConfig, keyofConfig);
  const visibleLabel = getLayoutConfig(layoutConfig, keyOfConfigLabel);

  series.update(pxLine);
  series.applyOptions({
    visible,
    lastValueVisible: visibleLabel,
    lastPriceAnimation: getAnimationMode(visible),
  });
};
