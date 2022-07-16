import {useSelector} from 'react-redux';

import {LayoutType} from '../../components/chart/layoutSelector/type';
import {PxDataMapSlotNames} from '../../types/pxData';
import {ReduxState} from '../types';
import {PxChartLayoutConfigSingle} from './types';


export const useLayoutTypeConfigSelector = (): LayoutType | null => {
  return useSelector(({config}: ReduxState) => config.isReady ? config.layoutType : null);
};

export const useLayoutSingleConfigSelector = (slot: PxDataMapSlotNames): PxChartLayoutConfigSingle | null => {
  return useSelector(({config}: ReduxState) => config.isReady ? config.layoutConfig[slot] : null);
};
