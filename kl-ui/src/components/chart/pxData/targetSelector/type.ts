import {PxData} from 'kl-web-common/models/pxData';
import {PxUniqueIdentifier} from 'kl-web-common/models/pxMeta';

import {PxSlotName} from '../../../../types/pxData';


export type TargetSelectorCommonProps = {
  pxData: PxData,
  slot: PxSlotName,
};

export type TargetSelectorButtonProps = TargetSelectorCommonProps & {
  token: string,
  disabled: boolean,
  beforeUpdate: () => void,
  afterUpdate: (identifier: PxUniqueIdentifier) => void,
};
