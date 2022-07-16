import {PxChartLayoutConfigKeys} from '../../components/chart/pxData/type';
import {defaultConfig} from './const';
import {PxChartLayoutConfigSingle} from './types';


export const getInitialConfigSingle = () : PxChartLayoutConfigSingle => ({
  ...defaultConfig,
});

export const getConfig = (config: PxChartLayoutConfigSingle, key: PxChartLayoutConfigKeys): boolean => {
  return config[key] ?? defaultConfig[key];
};
