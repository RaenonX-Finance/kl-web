/* eslint-disable new-cap */
import {Static, Type} from '@sinclair/typebox';

import {PxUniqueIdentifier, PxUniqueIdentifierSchema} from './pxMeta';


export const PxRequestSchema = Type.Object({
  identifier: PxUniqueIdentifierSchema,
  offset: Type.Optional(Type.Integer({exclusiveMinimum: 0})),
  limit: Type.Optional(Type.Integer({exclusiveMinimum: 0})),
});

export type PxRequestModel = Static<typeof PxRequestSchema> & {
  identifier: PxUniqueIdentifier
};

export const PxRequestBodySchema = Type.Object({
  token: Type.String(),
  requests: Type.Array(
    PxRequestSchema,
    {minItems: 1},
  ),
});

export type PxRequestBodyModel = Static<typeof PxRequestBodySchema> & {
  requests: PxRequestModel[],
};
