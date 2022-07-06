import {PxChartLayoutConfigKeys} from '../../components/chart/pxData/type';
import {initialConfig} from './const';
import {PxChartLayoutConfigState} from './types';


export const getInitialConfigSingle = () : PxChartLayoutConfigState => ({
  ...initialConfig,
});

export const getConfig = (config: PxChartLayoutConfigState, key: PxChartLayoutConfigKeys): boolean => {
  return config[key] || initialConfig[key];
};
