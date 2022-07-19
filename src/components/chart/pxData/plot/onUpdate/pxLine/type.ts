import {ISeriesApi} from 'lightweight-charts';

import {KeysOfType} from '../../../../../../utils/types';
import {ValidKeyForLineData} from '../../../dataConvert';
import {PxChartLayoutConfigBoolValKeys, PxChartLegendData, PxChartSeries} from '../../../type';


export type HandlePxLineOptions = {
  title: string,
  keyOfSeries: KeysOfType<PxChartSeries, ISeriesApi<'Line'> | null>,
  keyOfConfig: PxChartLayoutConfigBoolValKeys,
  keyOfConfigLabel: PxChartLayoutConfigBoolValKeys,
  keyOfLegendData: keyof PxChartLegendData,
  keyForLineData: ValidKeyForLineData,
};
