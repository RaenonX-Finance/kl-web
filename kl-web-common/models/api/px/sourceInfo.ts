import {Static, Type} from '@sinclair/typebox';

import {PxContractSchemaBase} from './pxMeta';


export const SourceInfoSchema = Type.Object({
  ...PxContractSchemaBase,
  exchangeName: Type.String(),
  exchangeSymbol: Type.String(),
});

export type SourceInfo = Static<typeof SourceInfoSchema>;
