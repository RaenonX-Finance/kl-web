import isEqual from 'lodash/isEqual';
import omit from 'lodash/omit';
import {useSelector} from 'react-redux';

import {PxData, PxSlotName} from '../../types/pxData';
import {ReduxState} from '../types';
import {PxDataSubscriptionInfo} from './types';


export const usePxDataSelector = (slot: PxSlotName): PxData | null => (
  useSelector(({pxData}: ReduxState) => pxData.data[slot],
    (a, b) => isEqual(omit(a, 'lastUpdated'), omit(b, 'lastUpdated')),
  )
);

export const usePxDataSubscriptionInfoSelector = (): PxDataSubscriptionInfo => (
  useSelector(
    ({pxData}: ReduxState) => {
      const securities = new Set<string>();
      const identifiers = new Set<string>();

      Object.values(pxData.data).forEach((data) => {
        if (!data) {
          return;
        }

        const {contract, uniqueIdentifier} = data;

        securities.add(contract.symbol);
        identifiers.add(uniqueIdentifier);
      });

      return {
        securities: [...securities].sort(),
        identifiers: [...identifiers].sort(),
      };
    }, isEqual,
  )
);

export const usePxDataLastUpdateSelector = (slot: PxSlotName): number | undefined => (
  useSelector(({pxData}: ReduxState) => pxData.data[slot]?.lastUpdated)
);
