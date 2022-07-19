import {PxData, PxSlotName} from '../../types/pxData';
import {PxChartLayoutConfig} from '../config/type';
import {getConfig} from '../config/utils';
import {defaultSlotMap} from './const';
import {PxSlotMap} from './types';


export const generateInitialSlotMap = (): PxSlotMap => ({
  ...defaultSlotMap,
});

export const isMarketPxUpdateOk = (layoutConfig: PxChartLayoutConfig, pxData: PxData, slot: PxSlotName) => {
  const interval = getConfig(layoutConfig[slot], 'intervalMarketPxSec');

  return (Date.now() - pxData.lastUpdated) / 1000 > interval;
};
