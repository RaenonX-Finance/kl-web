/* eslint-disable new-cap */
import {Static, Type} from '@sinclair/typebox';


export const PxMomentumIndexSchema = Type.Union([
  Type.Literal(3),
  Type.Literal(2),
  Type.Literal(1),
  Type.Literal(0),
  Type.Literal(-1),
  Type.Literal(-2),
  Type.Literal(-3),
]);

export type PxMomentumIndex = Static<typeof PxMomentumIndexSchema>;

export const PxCandleDirectionSchema = Type.Union([
  Type.Literal(1),
  Type.Literal(0),
  Type.Literal(-1),
]);

export type PxCandleDirection = Static<typeof PxCandleDirectionSchema>;

// Should have the same fields available in `KL.Common.CalculatedDataModel` of `kl-site-compute`
export const PxDataBarSchema = Type.Object({
  epochSecond: Type.Integer({exclusiveMinimum: 0}),
  open: Type.Number({exclusiveMinimum: 0}),
  high: Type.Number({exclusiveMinimum: 0}),
  low: Type.Number({exclusiveMinimum: 0}),
  close: Type.Number({exclusiveMinimum: 0}),
  diff: Type.Number(),
  candleDirection: PxCandleDirectionSchema,
  tiePoint: Type.Number({exclusiveMinimum: 0}),
  ema: Type.Record(
    Type.Optional(Type.Integer({exclusiveMinimum: 0})),
    Type.Number({exclusiveMinimum: 0}),
  ),
  date: Type.String(),
});

export type PxDataBar = Static<typeof PxDataBarSchema>;

export type PxDataBarModel = PxDataBar & {
  symbol: string,
  periodMin: number
};
