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
    for (const level of group) {
      if (!pxLevelsToRemove.has(level.toString())) {
        continue;
      }

      const pxLine = chartObjectRef.current.initData.lines.srLevelLines[idx][level];

      delete chartObjectRef.current.initData.lines.srLevelLines[idx][level];

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

  for (const [idx, group] of chartDataRef.current.supportResistance.groups.entries()) {
    for (const level of group) {
      const priceLine = chartObjectRef.current.initData.lines.srLevelLines[idx][level];

      if (!priceLine) {
        chartObjectRef.current.initData.lines.srLevelLines[idx][level] = priceSeries.createPriceLine({
          price: level,
          axisLabelVisible: false,
          lineVisible: true,
          title: '',
          color: getSrLevelGroupColor(idx),
          lineWidth: srLevelLineWidth,
          lineStyle: srLevelLineStyle,
        });
      }

      leftoverLevels.delete(level.toString());
    }
  }

  removePxLines(e, leftoverLevels, priceSeries);
};
