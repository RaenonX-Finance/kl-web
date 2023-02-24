import {PxEmaPeriodPair} from 'kl-web-common/models/config/emaPair';
import {PxDataBar} from 'kl-web-common/models/pxDataBar';
import {ISeriesApi} from 'lightweight-charts';

import {getLayoutConfig} from '../../../../../../state/config/utils';
import {PxLayoutConfigBoolValKeys} from '../../../../config/layout/type';
import {toLineData} from '../../../dataConvert';
import {OnPxChartUpdatedEvent} from '../../../type';
import {ColorOverridder} from '../../type';
import {getAnimationMode} from '../../utils';


type UpdateEmaOptions = {
  e: OnPxChartUpdatedEvent,
  series: ISeriesApi<'Line'>,
  periodType: keyof PxEmaPeriodPair,
  periodPair: PxEmaPeriodPair,
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
  const {chartDataRef, layoutConfig, partial} = e;

  const visible = getLayoutConfig(layoutConfig, keyofConfig);
  const visibleLabel = getLayoutConfig(layoutConfig, keyOfConfigLabel);

  if (partial) {
    series.update(toLineData((bar) => bar.ema[periodPair[periodType]], colorOverride)(lastPx));
  } else {
    series.setData(chartDataRef.current.data.map(toLineData((bar) => bar.ema[periodPair[periodType]], colorOverride)));
  }
  series.applyOptions({
    visible,
    lastValueVisible: visibleLabel,
    lastPriceAnimation: getAnimationMode(visible),
  });
};
