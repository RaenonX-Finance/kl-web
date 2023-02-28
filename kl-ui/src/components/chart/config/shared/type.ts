import {PxConfigEntriesGroup, PxConfigUI} from '../type';


export type PxSharedConfigKeys = keyof PxSharedConfig;

export type PxSharedConfigUI = PxConfigUI<PxSharedConfigKeys, string, PxSharedConfig>;

export type PxSharedConfig = {
  intervalMarketPxSec: number,
  intervalHistoryPxSec: number,
};

export type PxSharedConfigGroup = PxConfigEntriesGroup<PxSharedConfigKeys, string, PxSharedConfig>;
