import {PxData} from 'kl-web-common/models/pxData';


export type PxSlotName = 'A' | 'B' | 'C' | 'D';

export type PxDataMap = {[name in PxSlotName]: PxData | null};
