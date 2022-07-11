import {PxChartLayoutConfigKeys} from '../type';


export const configKeysToHideOfSecurity: {[security in string]?: PxChartLayoutConfigKeys[]} = {
  'NQ': ['srLevelBasic', 'srLevelBasicLabel'],
  'YM': ['srLevelBasic', 'srLevelBasicLabel'],
};
