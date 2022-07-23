import {PxSharedConfig} from '../../components/chart/config/shared/type';
import {PxDataBar} from '../../types/pxData';
import {getSharedConfig} from '../config/utils';
import {defaultSlotMap} from './const';
import {PxSlotMap} from './types';


export const generateInitialSlotMap = (): PxSlotMap => ({
  ...defaultSlotMap,
});

type IsMarketPxUpdateOkOpts = {
  sharedConfig: PxSharedConfig,
  lastUpdated: number | undefined,
  lastBar: PxDataBar | undefined,
  last: number,
};

export const isMarketPxUpdateOk = ({sharedConfig, lastUpdated, lastBar, last}: IsMarketPxUpdateOkOpts) => {
  if (lastBar && (last > lastBar.high || last < lastBar.low)) {
    // Forces update on:
    // - Breaking high
    // - Breaking low
    return true;
  } else if (lastBar?.close === last) {
    // Avoid duplicated update on:
    // - Unchanged Px
    return false;
  } else if (!lastUpdated) {
    // Data never updated before
    return true;
  }

  const interval = getSharedConfig(sharedConfig, 'intervalMarketPxSec');

  return (Date.now() - lastUpdated) / 1000 > interval;
};
