import {PxLayoutConfigKeys} from '../type';


export const configKeysToHideOfSecurity: {[security in string]?: PxLayoutConfigKeys[]} = {
  'NQ': ['srLevelBasic', 'srLevelBasicLabel'],
  'YM': ['srLevelBasic', 'srLevelBasicLabel'],
};
