import {PxDataMapValue, PxSlotName} from '../../../../types/pxData';


export type TargetSelectorCommonProps = {
  pxData: PxDataMapValue,
  slot: PxSlotName,
};

export type TargetSelectorButtonProps = {
  updating: boolean,
  onClick: (update: Partial<TargetSelected>) => PromiseLike<void>,
  target: TargetState,
};

export type TargetSelected = {
  symbol: string | null,
  periodMin: number | null,
};

export type TargetState = {
  selected: TargetSelected,
  queued: TargetSelected,
};
