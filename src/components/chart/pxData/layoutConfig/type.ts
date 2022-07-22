import {PxLayoutConfigEntry, PxLayoutConfigKeys} from '../type';


export type LayoutConfigEntriesGroup = {
  [group in string]: {
    [key in PxLayoutConfigKeys]: PxLayoutConfigEntry
  }
};
