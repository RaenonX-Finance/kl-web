import {PxSharedConfig} from '../../components/chart/config/shared/type';
import {PxData, PxDataBar} from '../../types/pxData';
import {getSharedConfig} from '../config/utils';
import {defaultSlotMap} from './const';
import {PxSlotMap} from './types';


export const generateInitialSlotMap = (): PxSlotMap => ({
  ...defaultSlotMap,
});

type IsMarketPxUpdateOkOpts = {
  sharedConfig: PxSharedConfig,
  pxData: PxData,
  lastBar: PxDataBar | undefined,
  last: number,
};

export const isMarketPxUpdateOk = ({sharedConfig, pxData, lastBar, last}: IsMarketPxUpdateOkOpts) => {
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

  const interval = getSharedConfig(sharedConfig, 'intervalMarketPxSec');

  return (Date.now() - pxData.lastUpdated) / 1000 > interval;
};
