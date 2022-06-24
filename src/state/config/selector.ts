import {useSelector} from 'react-redux';

import {ReduxState} from '../types';
import {ConfigSelectorReturn} from './types';


export const useConfigSelector = (): ConfigSelectorReturn => {
  return useSelector((state: ReduxState) => state.config);
};
