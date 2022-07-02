import {useSelector} from 'react-redux';

import {LayoutType} from '../../components/chart/layoutSelector/type';
import {PxDataMapSlotNames} from '../../types/pxData';
import {ReduxState} from '../types';
import {PxChartLayoutConfigState} from './types';


export const useLayoutTypeConfigSelector = (): LayoutType => {
  return useSelector((state: ReduxState) => state.config.layoutType);
};

export const useLayoutSingleConfigSelector = (slot: PxDataMapSlotNames): PxChartLayoutConfigState => {
  return useSelector((state: ReduxState) => state.config.layoutConfig[slot]);
};
