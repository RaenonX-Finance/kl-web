import {LineSeriesPartialOptions} from 'lightweight-charts';

import {PxLayoutConfigBoolValKeys} from '../../../../config/layout/type';
import {ValidKeyForLineData} from '../../../dataConvert';
import {OnPxChartInitEvent} from '../../../type';


export type AddPxLineOptionsFromInitEvent = Pick<
  OnPxChartInitEvent,
  'chartRef' | 'chartDataRef' | 'layoutConfig' | 'user'
>;

export type AddPxLineOptions =
  AddPxLineOptionsFromInitEvent &
  LineSeriesPartialOptions & {
    keyOfConfig: PxLayoutConfigBoolValKeys,
    keyOfConfigLabel: PxLayoutConfigBoolValKeys,
    keyForLineData: ValidKeyForLineData,
  };
