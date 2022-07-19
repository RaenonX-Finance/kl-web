import {PxChartLayoutConfigEntry, PxChartLayoutConfigKeys} from '../type';


export type LayoutConfigEntriesGroup = {
  [group in string]: {
    [key in PxChartLayoutConfigKeys]: PxChartLayoutConfigEntry
  }
};
