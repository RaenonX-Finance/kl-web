import {PxConfigEntriesGroup, PxConfigUI} from '../type';


export type PxSharedConfig = {
  intervalMarketPxSec: number,
};

export type PxSharedConfigKeys = keyof PxSharedConfig;

export type PxSharedConfigUI = PxConfigUI<PxSharedConfigKeys, string, PxSharedConfig>;

export type PxSharedConfigGroup = PxConfigEntriesGroup<PxSharedConfigKeys, string, PxSharedConfig>;
