/* eslint-disable new-cap */
import {Static, TString, Type} from '@sinclair/typebox';


export interface TUniqueIdentifier extends TString {
  static: `${string}@${number}`;
}

export const PxUniqueIdentifierSchema = Type.Unsafe<Static<TUniqueIdentifier>>(Type.String({
  type: 'string',
  pattern: `(\\w+)@(\\d+)`,
}));

export type PxUniqueIdentifier = Static<typeof PxUniqueIdentifierSchema>;

export const PxContractSchemaBase = {
  symbol: Type.String(),
  minTick: Type.Number({exclusiveMinimum: 0}),
  decimals: Type.Integer({minimum: 0}),
};

export const PxContractSchema = Type.Object({
  ...PxContractSchemaBase,
  name: Type.String(),
});

export type PxContract = Static<typeof PxContractSchema>;

export const PxSupportResistanceSchema = Type.Array(
  Type.Array(Type.Number({exclusiveMinimum: 0})),
  {minItems: 5, maxItems: 5},
);
