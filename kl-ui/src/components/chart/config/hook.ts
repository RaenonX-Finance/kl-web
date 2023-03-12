import {layoutConfigEntries} from './layout/const';
import {PxLayoutConfigGroup, PxLayoutConfigKeys, PxLayoutConfigSingle} from './layout/type';
import {sharedConfigEntries} from './shared/const';
import {PxSharedConfig, PxSharedConfigGroup, PxSharedConfigKeys} from './shared/type';
import {useConfigGroupMap} from './utils';


export const useGroupedLayoutConfigEntries = (): PxLayoutConfigGroup => {
  return useConfigGroupMap<PxLayoutConfigKeys, PxLayoutConfigSingle>(layoutConfigEntries);
};

export const useGroupedSharedConfigEntries = (): PxSharedConfigGroup => {
  return useConfigGroupMap<PxSharedConfigKeys, PxSharedConfig>(sharedConfigEntries);
};
