import {useSelector} from 'react-redux';

import {ReduxState} from '../types';
import {DataState} from './types';


export const useProductDataSelector = (): DataState['products'] => {
  return useSelector(({data}: ReduxState) => data.products);
};

export const usePeriodDataSelector = (): DataState['periods'] => {
  return useSelector(({data}: ReduxState) => data.periods);
};
