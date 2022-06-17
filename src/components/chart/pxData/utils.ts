import {BarData, UTCTimestamp} from 'lightweight-charts';

import {PxDataBar} from '../../../types/pxData';


export const toBarData = (bar: PxDataBar): BarData => ({
  time: bar.epochSec as UTCTimestamp,
  ...bar,
});
