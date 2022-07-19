import {PxData, PxSlotName} from '../../types/pxData';
import {defaultConfig} from '../config/const';
import {ConfigState} from '../config/type';
import {defaultSlotMap} from './const';
import {PxSlotMap} from './types';


export const generateInitialSlotMap = (): PxSlotMap => ({
  ...defaultSlotMap,
});

export const isMarketPxUpdateOk = (layoutConfig: ConfigState['layoutConfig'], pxData: PxData, slot: PxSlotName) => {
  const interval = (layoutConfig ? layoutConfig[slot].intervalMarketPx : defaultConfig.intervalMarketPx);

  return Date.now() - pxData.lastUpdated > interval;
};
