import {layoutConfigEntries} from './layout/const';
import {PxLayoutConfigGroup, PxLayoutConfigKeys, PxLayoutConfigSingle} from './layout/type';
import {sharedConfigEntries} from './shared/const';
import {PxSharedConfig, PxSharedConfigGroup, PxSharedConfigKeys} from './shared/type';
import {getConfigGroupMap} from './utils';


export const groupedLayoutConfigEntries: PxLayoutConfigGroup = getConfigGroupMap<
  PxLayoutConfigKeys,
  PxLayoutConfigSingle
>(
  layoutConfigEntries,
);

export const groupedSharedConfigEntries: PxSharedConfigGroup = getConfigGroupMap<
  PxSharedConfigKeys,
  PxSharedConfig
>(
  sharedConfigEntries,
);
