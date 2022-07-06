import {ISeriesApi} from 'lightweight-charts';

import {getConfig} from '../../../../../../state/config/utils';
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
  keyOfConfigLabel: PxChartLayoutConfigKeys,
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
  const visible = getConfig(layoutConfig, keyofConfig);
  const visibleLabel = getConfig(layoutConfig, keyOfConfigLabel);

  series.update(pxLine);
  series.applyOptions({
    visible,
    lastValueVisible: visibleLabel,
    lastPriceAnimation: getAnimationMode(visible),
  });
};
