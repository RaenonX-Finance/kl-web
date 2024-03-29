import {useSelector} from 'react-redux';

import {PxLayoutConfigSingle} from '../../components/chart/config/layout/type';
import {LayoutType} from '../../components/chart/layoutSelector/type';
import {PxSlotName} from '../../types/pxData';
import {ReduxState} from '../types';


export const useLayoutTypeConfigSelector = (): LayoutType | null => (
  useSelector(({config}: ReduxState) => config.layoutType)
);

export const useSingleLayoutConfigSelector = (slot: PxSlotName): PxLayoutConfigSingle | null => (
  useSelector(({config}: ReduxState) => config.layoutConfig && config.layoutConfig[slot])
);
