import {PxData, PxSlotName} from '../../../../types/pxData';


export type TargetSelectorCommonProps = {
  pxData: PxData,
  slot: PxSlotName,
};

export type TargetSelectorButtonProps = TargetSelectorCommonProps & {
  token: string,
  closeModal: () => void,
};
