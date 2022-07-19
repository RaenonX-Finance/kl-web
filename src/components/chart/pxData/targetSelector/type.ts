import {PxData, PxDataUniqueIdentifier, PxSlotName} from '../../../../types/pxData';


export type TargetSelectorCommonProps = {
  pxData: PxData,
  slot: PxSlotName,
};

export type TargetSelectorButtonProps = TargetSelectorCommonProps & {
  token: string,
  afterUpdate: (identifier: PxDataUniqueIdentifier) => void,
};
