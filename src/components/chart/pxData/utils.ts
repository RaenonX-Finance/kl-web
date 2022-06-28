import {CandlestickData, UTCTimestamp} from 'lightweight-charts';

import {PxDataBar} from '../../../types/pxData';
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
