import {IPriceLine, ISeriesApi} from 'lightweight-charts';

import {getConfig} from '../../../../../../state/config/utils';
import {OnPxChartInitEvent, PxChartLayoutConfigBoolValKeys} from '../../../type';
import {SrLevelCommonOptions} from '../../type';


type HandleSrCommonOptions = {
  e: OnPxChartInitEvent,
  price: ISeriesApi<'Candlestick'>,
  keyOfConfig: PxChartLayoutConfigBoolValKeys,
  keyOfConfigLabel: PxChartLayoutConfigBoolValKeys,
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
  const {chartDataRef, layoutConfig} = e;

  const lineRecord: Record<number, IPriceLine> = {};
  const currentPx = chartDataRef.current.data.at(-1);

  if (!currentPx || !getConfig(layoutConfig, keyOfConfig)) {
    return {};
  }

  const axisLabelVisible = getConfig(layoutConfig, keyOfConfigLabel);

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
