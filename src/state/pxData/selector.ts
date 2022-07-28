import isEqual from 'lodash/isEqual';
import {useSelector} from 'react-redux';

import {PxData, PxSlotName} from '../../types/pxData';
import {ReduxState} from '../types';
import {PxDataSubscriptionInfo, PxSlotMap} from './types';


export const usePxDataSelector = (slot: PxSlotName): PxData | null => (
  useSelector(({pxData}: ReduxState) => pxData.data[slot], isEqual)
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

export const usePxSlotMap = (): PxSlotMap | null => (
  useSelector(({pxData}: ReduxState) => pxData.map)
);

export const usePxSlotIdentifier = (slot: PxSlotName): string | null => (
  useSelector(({pxData}: ReduxState) => pxData.map ? pxData.map[slot] : null)
);
