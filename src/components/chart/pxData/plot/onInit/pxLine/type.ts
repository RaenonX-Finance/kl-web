import {LineSeriesPartialOptions} from 'lightweight-charts';

import {ValidKeyForLineData} from '../../../dataConvert';
import {OnPxChartInitEvent, PxChartLayoutConfigKeys} from '../../../type';


export type AddPxLineOptionsFromInitEvent = Pick<OnPxChartInitEvent, 'chartRef' | 'chartDataRef' | 'layoutConfig'>;

export type AddPxLineOptions =
  AddPxLineOptionsFromInitEvent &
  LineSeriesPartialOptions & {
    keyOfConfig: PxChartLayoutConfigKeys,
    keyForLineData: ValidKeyForLineData,
  };
