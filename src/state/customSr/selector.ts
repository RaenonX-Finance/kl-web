import {useSelector} from 'react-redux';

import {CustomSrLevel} from '../../types/init';
import {ReduxState} from '../types';


export const useCustomSrSelector = (symbol: string | undefined): CustomSrLevel[] | undefined => {
  return useSelector((state: ReduxState) => !!symbol ? state.customSr[symbol] : undefined);
};
