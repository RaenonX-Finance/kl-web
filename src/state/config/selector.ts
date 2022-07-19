import {useSelector} from 'react-redux';

import {LayoutType} from '../../components/chart/layoutSelector/type';
import {PxChartLayoutConfigSingle} from '../../components/chart/pxData/type';
import {PxSlotName} from '../../types/pxData';
import {ReduxState} from '../types';


export const useLayoutTypeConfigSelector = (): LayoutType | null => {
  return useSelector(({config}: ReduxState) => config.layoutType);
};

export const useSingleLayoutConfigSelector = (slot: PxSlotName): PxChartLayoutConfigSingle | null => {
  return useSelector(({config}: ReduxState) => config.layoutConfig && config.layoutConfig[slot]);
};
