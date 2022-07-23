import {useSelector} from 'react-redux';

import {ReduxState} from '../types';
import {DataState} from './types';


export const useProductDataSelector = (): DataState['products'] => (
  useSelector(({data}: ReduxState) => data.products)
);

export const usePeriodDataSelector = (): DataState['periods'] => (
  useSelector(({data}: ReduxState) => data.periods)
);

export const useLastPxUpdateSelector = (security: string): number | undefined => (
  useSelector(({data}: ReduxState) => data.lastPxUpdate[security])
);
