import isEqual from 'lodash/isEqual';
import {useSelector} from 'react-redux';

import {PxData, PxDataUniqueIdentifier, PxSlotName} from '../../types/pxData';
import {getValidSlotNames} from '../config/utils';
import {ReduxState} from '../types';
import {PxDataSubscriptionInfo, PxSlotMap} from './types';


export const usePxDataSelector = (slot: PxSlotName): PxData | null => (
  useSelector(({pxData}: ReduxState) => pxData.data[slot], isEqual)
);

export const usePxDataSubscriptionInfoSelector = (): PxDataSubscriptionInfo => (
  useSelector(
    ({pxData, config}: ReduxState) => {
      const identifiers = new Set<PxDataUniqueIdentifier>();
      const slotNames = getValidSlotNames(config.layoutType);

      if (!slotNames || !pxData.map) {
        return {
          identifiers: [],
        };
      }

      for (const slotName of slotNames) {
        identifiers.add(pxData.map[slotName]);
      }

      return {
        identifiers: [...identifiers].sort(),
      };
    }, isEqual,
  )
);

export const usePxSlotMap = (): PxSlotMap | null => (
  useSelector(({pxData}: ReduxState) => pxData.map)
);

export const usePxSlotIdentifier = (slot: PxSlotName): PxDataUniqueIdentifier | null => (
  useSelector(({pxData}: ReduxState) => pxData.map ? pxData.map[slot] : null)
);
