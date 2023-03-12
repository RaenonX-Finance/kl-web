/* eslint-disable new-cap */
import {Static, Type} from '@sinclair/typebox';


export const PxUniqueIdentifierSchema = Type.String({pattern: `(\\w+)@(\\d+)`});

export type PxUniqueIdentifier = `${string}@${number}`;

export const PxContractSchema = Type.Object({
  symbol: Type.String(),
  name: Type.String(),
  minTick: Type.Number({exclusiveMinimum: 0}),
  decimals: Type.Integer({minimum: 0}),
});

export type PxContract = Static<typeof PxContractSchema>;

export const PxSupportResistanceSchema = Type.Array(
  Type.Array(Type.Number({exclusiveMinimum: 0})),
  {minItems: 5, maxItems: 5},
);

export type PxSupportResistance = Static<typeof PxSupportResistanceSchema>;
