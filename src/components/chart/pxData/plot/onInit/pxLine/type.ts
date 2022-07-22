import {LineSeriesPartialOptions} from 'lightweight-charts';

import {ValidKeyForLineData} from '../../../dataConvert';
import {OnPxChartInitEvent, PxLayoutConfigBoolValKeys} from '../../../type';


export type AddPxLineOptionsFromInitEvent = Pick<OnPxChartInitEvent, 'chartRef' | 'chartDataRef' | 'layoutConfig'>;

export type AddPxLineOptions =
  AddPxLineOptionsFromInitEvent &
  LineSeriesPartialOptions & {
    keyOfConfig: PxLayoutConfigBoolValKeys,
    keyOfConfigLabel: PxLayoutConfigBoolValKeys,
    keyForLineData: ValidKeyForLineData,
  };
