/* eslint-disable new-cap */
import {Static, Type} from '@sinclair/typebox';

import {PxMomentumIndexSchema} from './pxDataBar';


const PxMarketSingleSchemaBase = {
  o: Type.Number({exclusiveMinimum: 0}),
  h: Type.Number({exclusiveMinimum: 0}),
  l: Type.Number({exclusiveMinimum: 0}),
  c: Type.Number({exclusiveMinimum: 0}),
  diffVal: Type.Number(),
  diffPct: Type.Number(),
};

export const PxMarketSingleForTransmitSchema = Type.Object({
  ...PxMarketSingleSchemaBase,
  momentum: PxMomentumIndexSchema,
});

export type PxMarketSingleForTransmit = Static<typeof PxMarketSingleForTransmitSchema>;

export const PxMarketForTransmitSchema = Type.Record(
  Type.Optional(Type.String()),
  PxMarketSingleForTransmitSchema,
);

export type PxMarketForTransmit = Static<typeof PxMarketForTransmitSchema>;

export const PxMarketSingleSchema = Type.Object(PxMarketSingleSchemaBase);
