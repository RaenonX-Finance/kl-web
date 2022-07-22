import {PxData, PxDataUniqueIdentifier, PxSlotName} from '../../../../types/pxData';


export type TargetSelectorCommonProps = {
  pxData: PxData,
  slot: PxSlotName,
};

export type TargetSelectorButtonProps = TargetSelectorCommonProps & {
  token: string,
  disabled: boolean,
  beforeUpdate: () => void,
  afterUpdate: (identifier: PxDataUniqueIdentifier) => void,
};
