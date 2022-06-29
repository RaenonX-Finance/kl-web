import {CandlestickData, SeriesDataItemTypeMap, UTCTimestamp} from 'lightweight-charts';

import {PxDataBar, PxDataBarEmaKey} from '../../../types/pxData';
import {KeysOfType} from '../../../utils/types';
import {colorOfCandlestickDirection} from './plot/const';


export const toCandlestick = (useCandlestickDirection: boolean) => (bar: PxDataBar): CandlestickData => ({
  time: bar.epochSec as UTCTimestamp,
  ...bar,
  ...(
    useCandlestickDirection ?
      {
        color: colorOfCandlestickDirection[bar.candlestick],
        borderColor: colorOfCandlestickDirection[bar.candlestick],
        wickColor: colorOfCandlestickDirection[bar.candlestick],
      } :
      {}
  ),
});

export type ValidKeyForOHLC = KeysOfType<PxDataBar, number | null> | PxDataBarEmaKey;

export const toCandlestickForFill = (
  keyOfOpen: ValidKeyForOHLC, keyOfClose: ValidKeyForOHLC,
) => (
  bar: PxDataBar,
): CandlestickData => {
  const open = bar[keyOfOpen] || NaN;
  const close = bar[keyOfClose] || NaN;

  return {
    time: bar.epochSec as UTCTimestamp,
    open,
    high: Math.max(open, close),
    low: Math.min(open, close),
    close,
  };
};

export type ValidKeyForLineData = KeysOfType<PxDataBar, number | null> | PxDataBarEmaKey;

export const toLineData = <K extends ValidKeyForLineData>(
  key: K,
) => (
  bar: PxDataBar,
): SeriesDataItemTypeMap['Line'] => {
  const value = bar[key];

  if (!value) {
    return {
      time: bar.epochSec as UTCTimestamp,
    };
  }

  return {
    time: bar.epochSec as UTCTimestamp,
    value,
  };
};
