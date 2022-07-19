import {LineSeriesPartialOptions} from 'lightweight-charts';

import {ValidKeyForLineData} from '../../../dataConvert';
import {OnPxChartInitEvent, PxChartLayoutConfigBoolValKeys} from '../../../type';


export type AddPxLineOptionsFromInitEvent = Pick<OnPxChartInitEvent, 'chartRef' | 'chartDataRef' | 'layoutConfig'>;

export type AddPxLineOptions =
  AddPxLineOptionsFromInitEvent &
  LineSeriesPartialOptions & {
    keyOfConfig: PxChartLayoutConfigBoolValKeys,
    keyOfConfigLabel: PxChartLayoutConfigBoolValKeys,
    keyForLineData: ValidKeyForLineData,
  };
