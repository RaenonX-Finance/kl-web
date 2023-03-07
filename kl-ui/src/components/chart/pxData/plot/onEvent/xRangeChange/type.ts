import {BarsInfo} from 'lightweight-charts';

import {OnPxChartInitEvent} from '../../../type';


export type HandleXrangeChangeOpts = {
  e: OnPxChartInitEvent,
  barsInfo: BarsInfo | null,
};
