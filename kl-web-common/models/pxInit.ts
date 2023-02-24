import {Type} from '@sinclair/typebox';

import {PxData, PxDataSchema} from './pxData';


export const PxInitSchema = Type.Array(PxDataSchema);

export type PxInit = PxData[];
