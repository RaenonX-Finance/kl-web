import {PxDataBar} from 'kl-web-common/models/pxDataBar';

import {defaultSlotMap} from './const';
import {PxSlotMap} from './types';
import {PxSharedConfig} from '../../components/chart/config/shared/type';
import {PxSlotName} from '../../types/pxData';
import {getSharedConfig} from '../config/utils';


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

export const layoutCountToSlotNames: {[count in number]?: PxSlotName[]} = {
  [1]: ['A'],
  [2]: ['A', 'B'],
  [3]: ['A', 'B', 'C'],
  [4]: ['A', 'B', 'C', 'D'],
};
