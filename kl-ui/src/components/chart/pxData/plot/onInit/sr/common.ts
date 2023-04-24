import {IPriceLine, ISeriesApi} from 'lightweight-charts';

import {getLayoutConfig} from '../../../../../../state/config/utils';
import {PxLayoutConfigBoolValKeys} from '../../../../config/layout/type';
import {OnPxChartInitEvent} from '../../../type';
import {SrLevelCommonOptions} from '../../type';


type HandleSrCommonOptions = {
  e: OnPxChartInitEvent,
  price: ISeriesApi<'Candlestick'>,
  keyOfConfig: PxLayoutConfigBoolValKeys,
  keyOfConfigLabel: PxLayoutConfigBoolValKeys,
  levels: number[],
  color: string,
  commonOptions: SrLevelCommonOptions,
};

export const handleSrCommon = ({
  e,
  price,
  keyOfConfig,
  keyOfConfigLabel,
  levels,
  color,
  commonOptions,
}: HandleSrCommonOptions): Record<number, IPriceLine> => {
  const {chartDataRef, layoutConfig, user} = e;

  const lineRecord: Record<number, IPriceLine> = {};
  const currentPx = chartDataRef.current.data.at(-1);

  if (!currentPx || !getLayoutConfig({config: layoutConfig, key: keyOfConfig, user})) {
    return {};
  }

  const axisLabelVisible = getLayoutConfig({config: layoutConfig, key: keyOfConfigLabel, user});

  levels.forEach((level) => {
    lineRecord[level] = price.createPriceLine({
      axisLabelVisible,
      price: level,
      color,
      ...commonOptions,
    });
  });

  return lineRecord;
};
