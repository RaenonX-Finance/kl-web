import {PxDataBar} from 'kl-web-common/models/pxDataBar';
import {CandlestickData, SeriesDataItemTypeMap, UTCTimestamp} from 'lightweight-charts';

import {colorOfCandlestickDirection} from './plot/const';
import {KeysOfType} from '../../../utils/types';


export const toCandlestick = (useCandlestickDirection: boolean) => (bar: PxDataBar): CandlestickData => ({
  time: bar.epochSecond as UTCTimestamp,
  ...bar,
  ...(
    useCandlestickDirection &&
    {
      color: colorOfCandlestickDirection[bar.candleDirection],
      borderColor: colorOfCandlestickDirection[bar.candleDirection],
      wickColor: colorOfCandlestickDirection[bar.candleDirection],
    }
  ),
});

export type GetPxFromBar = (bar: PxDataBar) => number | undefined;

export const toCandlestickForFill = (
  getCandleOpen: GetPxFromBar,
  getCandleClose: GetPxFromBar,
) => (
  bar: PxDataBar,
): CandlestickData => {
  const open = getCandleOpen(bar) || NaN;
  const close = getCandleClose(bar) || NaN;

  return {
    time: bar.epochSecond as UTCTimestamp,
    open,
    high: Math.max(open, close),
    low: Math.min(open, close),
    close,
  };
};

export type ValidKeyForLineData = KeysOfType<PxDataBar, number | null>;

export const toLineData = (
  getValue: GetPxFromBar,
  colorOverride?: (bar: PxDataBar) => string,
) => (
  bar: PxDataBar,
): SeriesDataItemTypeMap['Line'] => {
  const value = getValue(bar);

  if (!value) {
    return {
      time: bar.epochSecond as UTCTimestamp,
    };
  }

  return {
    time: bar.epochSecond as UTCTimestamp,
    color: colorOverride && colorOverride(bar),
    value,
  };
};
