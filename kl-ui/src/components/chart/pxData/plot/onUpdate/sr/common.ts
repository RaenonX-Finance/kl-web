import {IPriceLine, ISeriesApi} from 'lightweight-charts';

import {getLayoutConfig} from '../../../../../../state/config/utils';
import {PxLayoutConfigBoolValKeys} from '../../../../config/layout/type';
import {OnPxChartUpdatedEvent} from '../../../type';
import {SrLevelCommonOptions} from '../../type';


const removePxLines = (
  pxLevelsToRemove: Set<number>,
  pxSeries: ISeriesApi<'Candlestick'>,
  lineRecord: Record<number, IPriceLine>,
) => {
  if (pxLevelsToRemove.size <= 0) {
    return;
  }

  for (const level of pxLevelsToRemove) {
    const pxLine = lineRecord[level];

    delete lineRecord[level];

    if (pxLine) {
      // Price line could be `undefined` if already removed
      pxSeries.removePriceLine(pxLine);
    }
  }
};

type HandleSrCommonOptions = {
  e: OnPxChartUpdatedEvent,
  keyOfConfig: PxLayoutConfigBoolValKeys,
  keyOfConfigLabel: PxLayoutConfigBoolValKeys,
  levels: number[],
  lineRecord: Record<number, IPriceLine>,
  color: string,
  commonOptions: SrLevelCommonOptions,
};

export const handleSrCommon = ({
  e,
  keyOfConfig,
  keyOfConfigLabel,
  levels,
  lineRecord,
  color,
  commonOptions,
}: HandleSrCommonOptions) => {
  const {layoutConfig, chartObjectRef} = e;
  if (!chartObjectRef.current) {
    return;
  }

  const {price: priceSeries} = chartObjectRef.current.initData.series;

  if (!getLayoutConfig(layoutConfig, keyOfConfig)) {
    // No data available / layout config not enabled, remove all Px lines
    removePxLines(new Set(levels), priceSeries, lineRecord);
    return;
  }

  const leftoverLevels = new Set(levels);

  for (const level of levels) {
    const priceLine = lineRecord[level];
    const axisLabelVisible = getLayoutConfig(layoutConfig, keyOfConfigLabel);

    if (priceLine) {
      priceLine.applyOptions({axisLabelVisible});
    } else {
      lineRecord[level] = priceSeries.createPriceLine({
        price: level,
        axisLabelVisible,
        color,
        ...commonOptions,
      });
    }

    leftoverLevels.delete(level);
  }

  removePxLines(leftoverLevels, priceSeries, lineRecord);
};
