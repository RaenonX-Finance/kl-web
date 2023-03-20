/* eslint-disable new-cap */
import {Static, Type} from '@sinclair/typebox';

import {PxDataBarSchema} from './pxDataBar';
import {PxSupportResistanceSchema, PxUniqueIdentifierSchema} from './pxMeta';


export const PxHistorySingleSchemaBase = {
  uniqueIdentifier: PxUniqueIdentifierSchema,
  symbol: Type.String(),
  data: Type.Array(PxDataBarSchema, {minItems: 1}),
  supportResistance: PxSupportResistanceSchema,
};

export const PxHistorySingleSchema = Type.Object(PxHistorySingleSchemaBase);

export type PxHistorySingle = Static<typeof PxHistorySingleSchema>;

export const PxHistorySchema = Type.Array(PxHistorySingleSchema);

export type PxHistory = Static<typeof PxHistorySchema>;
