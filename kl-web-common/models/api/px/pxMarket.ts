/* eslint-disable new-cap */
import {Static, Type} from '@sinclair/typebox';

import {PxMomentumIndexSchema} from './pxDataBar';


export const PxMarketSingleSchema = Type.Object({
  o: Type.Number({exclusiveMinimum: 0}),
  h: Type.Number({exclusiveMinimum: 0}),
  l: Type.Number({exclusiveMinimum: 0}),
  c: Type.Number({exclusiveMinimum: 0}),
  diffVal: Type.Number(),
  diffPct: Type.Number(),
  momentum: PxMomentumIndexSchema,
});

export type PxMarketSingle = Static<typeof PxMarketSingleSchema>;

export const PxMarketSchema = Type.Record(
  Type.Optional(Type.String()),
  PxMarketSingleSchema,
);

export type PxMarket = Static<typeof PxMarketSchema>;
