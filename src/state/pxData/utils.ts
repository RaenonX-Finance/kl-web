import {PxData, PxDataBar, PxSlotName} from '../../types/pxData';
import {PxLayoutConfig} from '../config/type';
import {getLayoutConfig} from '../config/utils';
import {defaultSlotMap} from './const';
import {PxSlotMap} from './types';


export const generateInitialSlotMap = (): PxSlotMap => ({
  ...defaultSlotMap,
});

type IsMarketPxUpdateOkOpts = {
  layoutConfig: PxLayoutConfig,
  pxData: PxData,
  slot: PxSlotName,
  lastBar: PxDataBar | undefined,
  last: number,
};

export const isMarketPxUpdateOk = ({layoutConfig, pxData, slot, lastBar, last}: IsMarketPxUpdateOkOpts) => {
  if (lastBar && (last > lastBar.high || last < lastBar.low)) {
    // Forces update on:
    // - Breaking high
    // - Breaking low
    return true;
  } else if (lastBar?.close === last) {
    // Avoid duplicated update on:
    // - Unchanged Px
    return false;
  }

  const interval = getLayoutConfig(layoutConfig[slot], 'intervalMarketPxSec');

  return (Date.now() - pxData.lastUpdated) / 1000 > interval;
};
