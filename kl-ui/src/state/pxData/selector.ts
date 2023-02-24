import {PxData} from 'kl-web-common/models/pxData';
import {PxUniqueIdentifier} from 'kl-web-common/models/pxMeta';
import isEqual from 'lodash/isEqual';
import {useSelector} from 'react-redux';

import {PxDataSubscriptionInfo, PxSlotMap} from './types';
import {PxSlotName} from '../../types/pxData';
import {getValidSlotNames} from '../config/utils';
import {ReduxState} from '../types';


export const usePxDataSelector = (slot: PxSlotName): PxData | null => (
  useSelector(({pxData}: ReduxState) => pxData.data[slot], isEqual)
);

export const usePxDataSubscriptionInfoSelector = (): PxDataSubscriptionInfo => (
  useSelector(
    ({pxData, config}: ReduxState) => {
      const identifiers = new Set<PxUniqueIdentifier>();
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
    },
    isEqual,
  )
);

export const usePxSlotMap = (): PxSlotMap | null => (
  useSelector(({pxData}: ReduxState) => pxData.map)
);

export const usePxSlotIdentifier = (slot: PxSlotName): PxUniqueIdentifier | null => (
  useSelector(({pxData}: ReduxState) => pxData.map ? pxData.map[slot] : null)
);
