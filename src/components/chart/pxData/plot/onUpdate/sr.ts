import {ISeriesApi} from 'lightweight-charts';

import {OnPxChartUpdatedEvent} from '../../type';
import {getSrLevelGroupColor, srLevelLineStyle, srLevelLineWidth} from '../const';


const removePxLines = (
  e: OnPxChartUpdatedEvent,
  pxLevelsToRemove: Set<string>,
  pxSeries: ISeriesApi<'Candlestick'>,
) => {
  if (pxLevelsToRemove.size <= 0) {
    return;
  }

  const {chartObjectRef, chartDataRef} = e;

  if (!chartObjectRef.current) {
    return;
  }

  for (const [idx, group] of chartDataRef.current.supportResistance.groups.entries()) {
    const pxLineGroup = chartObjectRef.current.initData.lines.srLevelLines[idx];

    if (!pxLineGroup) {
      continue;
    }

    for (const level of group) {
      if (!pxLevelsToRemove.has(level.toString())) {
        continue;
      }

      const pxLine = pxLineGroup[level];

      delete pxLineGroup[level];

      if (pxLine) {
        // Price line could be `undefined` if already removed
        pxSeries.removePriceLine(pxLine);
      }
    }
  }
};


export const handleSR = (e: OnPxChartUpdatedEvent) => {
  const {chartDataRef, chartObjectRef, layoutConfig} = e;
  if (!chartObjectRef.current) {
    return;
  }

  const {price: priceSeries} = chartObjectRef.current.initData.series;

  const srLevelSeries = chartObjectRef.current.initData.lines.srLevelLines;
  const leftoverLevels = new Set(Object.values(srLevelSeries).flatMap((block) => Object.keys(block)));
  const currentPx = chartDataRef.current.data.at(-1);

  if (!currentPx) {
    return;
  }

  if (!layoutConfig.srLevel.enable) {
    // No data available / layout config not enabled, remove all Px lines
    removePxLines(e, leftoverLevels, priceSeries);
    return;
  }

  for (const [idxGroup, group] of chartDataRef.current.supportResistance.groups.entries()) {
    const srLevelLinesGroup = chartObjectRef.current.initData.lines.srLevelLines[idxGroup];

    if (!srLevelLinesGroup) {
      chartObjectRef.current.initData.lines.srLevelLines[idxGroup] = {};
    }

    for (const level of group) {
      const priceLine = chartObjectRef.current.initData.lines.srLevelLines[idxGroup][level];

      if (priceLine) {
        priceLine.applyOptions({axisLabelVisible: layoutConfig.srLevelLabel.enable});
      } else {
        chartObjectRef.current.initData.lines.srLevelLines[idxGroup][level] = priceSeries.createPriceLine({
          price: level,
          axisLabelVisible: layoutConfig.srLevelLabel.enable,
          lineVisible: true,
          title: '',
          color: getSrLevelGroupColor(idxGroup),
          lineWidth: srLevelLineWidth,
          lineStyle: srLevelLineStyle,
        });
      }

      leftoverLevels.delete(level.toString());
    }
  }

  removePxLines(e, leftoverLevels, priceSeries);
};
