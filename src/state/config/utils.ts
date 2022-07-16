import {PxChartLayoutConfigKeys} from '../../components/chart/pxData/type';
import {defaultConfig} from './const';
import {PxChartLayoutConfig, PxChartLayoutConfigSingle} from './types';


export const generateInitialConfig = () : PxChartLayoutConfig => ({
  A: {...defaultConfig},
  B: {...defaultConfig},
  C: {...defaultConfig},
  D: {...defaultConfig},
});

export const getConfig = (config: PxChartLayoutConfigSingle, key: PxChartLayoutConfigKeys): boolean => {
  return config[key] ?? defaultConfig[key];
};
