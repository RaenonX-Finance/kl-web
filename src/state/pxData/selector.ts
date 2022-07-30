import isEqual from 'lodash/isEqual';
import {useSelector} from 'react-redux';

import {PxData, PxDataUniqueIdentifier, PxSlotName} from '../../types/pxData';
import {ReduxState} from '../types';
import {PxDataSubscriptionInfo, PxSlotMap} from './types';


export const usePxDataSelector = (slot: PxSlotName): PxData | null => (
  useSelector(({pxData}: ReduxState) => pxData.data[slot], isEqual)
);

export const usePxDataSubscriptionInfoSelector = (): PxDataSubscriptionInfo => (
  useSelector(
    ({pxData}: ReduxState) => {
      const identifiers = new Set<PxDataUniqueIdentifier>();

      Object.values(pxData.data).forEach((data) => {
        if (!data) {
          return;
        }

        const {uniqueIdentifier} = data;

        identifiers.add(uniqueIdentifier);
      });

      return {
        identifiers: [...identifiers].sort(),
      };
    }, isEqual,
  )
);

export const usePxSlotMap = (): PxSlotMap | null => (
  useSelector(({pxData}: ReduxState) => pxData.map)
);

export const usePxSlotIdentifier = (slot: PxSlotName): string | null => (
  useSelector(({pxData}: ReduxState) => pxData.map ? pxData.map[slot] : null)
);
