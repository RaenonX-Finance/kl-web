import {Static, Type} from '@sinclair/typebox';

import {PxDataSchema} from './pxData';


export const PxInitSchema = Type.Array(PxDataSchema);

export type PxInit = Static<typeof PxInitSchema>;
