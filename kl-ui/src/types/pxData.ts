import {PxData} from 'kl-web-common/models/pxData';


export type PxSlotName = 'A' | 'B' | 'C' | 'D';

// `null` for unavailable, `undefined` for uninitialized
export type PxDataMapValue = PxData | null | undefined;

export type PxDataMap = {[name in PxSlotName]: PxDataMapValue};
