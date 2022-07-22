import {ISeriesApi} from 'lightweight-charts';

import {KeysOfType} from '../../../../../../utils/types';
import {ValidKeyForLineData} from '../../../dataConvert';
import {PxLayoutConfigBoolValKeys, PxChartLegendData, PxChartSeries} from '../../../type';


export type HandlePxLineOptions = {
  title: string,
  keyOfSeries: KeysOfType<PxChartSeries, ISeriesApi<'Line'> | null>,
  keyOfConfig: PxLayoutConfigBoolValKeys,
  keyOfConfigLabel: PxLayoutConfigBoolValKeys,
  keyOfLegendData: keyof PxChartLegendData,
  keyForLineData: ValidKeyForLineData,
};
