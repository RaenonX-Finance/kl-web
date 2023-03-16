import {defaultSlotMap} from './const';
import {PxSlotMap} from './types';
import {PxSlotName} from '../../types/pxData';


export const generateInitialSlotMap = (): PxSlotMap => ({
  ...defaultSlotMap,
});

export const layoutCountToSlotNames: {[count in number]?: PxSlotName[]} = {
  [1]: ['A'],
  [2]: ['A', 'B'],
  [3]: ['A', 'B', 'C'],
  [4]: ['A', 'B', 'C', 'D'],
};
