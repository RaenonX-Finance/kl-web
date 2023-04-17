import {layoutConfigEntries} from './layout/const';
import {PxLayoutConfigGroup, PxLayoutConfigKeys, PxLayoutConfigSingle} from './layout/type';
import {useConfigGroupMap} from './utils';


export const useGroupedLayoutConfigEntries = (): PxLayoutConfigGroup => {
  return useConfigGroupMap<PxLayoutConfigKeys, PxLayoutConfigSingle>(layoutConfigEntries);
};
