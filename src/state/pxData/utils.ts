import {PxData, PxDataBar, PxSlotName} from '../../types/pxData';
import {PxChartLayoutConfig} from '../config/type';
import {getConfig} from '../config/utils';
import {defaultSlotMap} from './const';
import {PxSlotMap} from './types';


export const generateInitialSlotMap = (): PxSlotMap => ({
  ...defaultSlotMap,
});

type IsMarketPxUpdateOkOpts = {
  layoutConfig: PxChartLayoutConfig,
  pxData: PxData,
  slot: PxSlotName,
  lastBar: PxDataBar | undefined,
  last: number,
};

export const isMarketPxUpdateOk = ({layoutConfig, pxData, slot, lastBar, last}: IsMarketPxUpdateOkOpts) => {
  if (lastBar && (last > lastBar.high || last < lastBar.low)) {
    return true;
  }

  const interval = getConfig(layoutConfig[slot], 'intervalMarketPxSec');

  return (Date.now() - pxData.lastUpdated) / 1000 > interval;
};
