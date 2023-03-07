import {useSelector} from 'react-redux';

import {ErrorSelectorReturn} from './types';
import {ReduxState} from '../types';


export const useErrorSelector = (): ErrorSelectorReturn => (
  useSelector((state: ReduxState) => state.error)
);
