import {ISeriesApi} from 'lightweight-charts';

import {KeysOfType} from '../../../../../../utils/types';
import {ValidKeyForLineData} from '../../../dataConvert';
import {PxChartLayoutConfigKeys, PxChartLegendData, PxChartSeries} from '../../../type';


export type HandlePxLineOptions = {
  keyOfSeries: KeysOfType<PxChartSeries, ISeriesApi<'Line'> | null>,
  keyOfConfig: PxChartLayoutConfigKeys,
  keyOfLegendData: keyof PxChartLegendData,
  keyForLineData: ValidKeyForLineData,
};
