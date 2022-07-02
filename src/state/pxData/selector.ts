import {useSelector} from 'react-redux';

import {PxData, PxDataMapSlotNames} from '../../types/pxData';
import {ReduxState} from '../types';


export const usePxDataSelector = (slot: PxDataMapSlotNames): PxData | null => {
  return useSelector((state: ReduxState) => state.pxData.data[slot]);
};
