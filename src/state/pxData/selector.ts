import {useSelector} from 'react-redux';

import {PxData, PxDataMapSlotNames} from '../../types/pxData';
import {ReduxState} from '../types';


export const usePxDataSelector = (slot: PxDataMapSlotNames): PxData | null => {
  return useSelector(({pxData}: ReduxState) => pxData.mapReady ? pxData.data[slot] : null);
};
