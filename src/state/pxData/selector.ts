import {useSelector} from 'react-redux';

import {PxData, PxSlotName} from '../../types/pxData';
import {ReduxState} from '../types';


export const usePxDataSelector = (slot: PxSlotName): PxData | null => {
  return useSelector(({pxData}: ReduxState) => pxData.data[slot]);
};
