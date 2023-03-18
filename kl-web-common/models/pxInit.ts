/* eslint-disable new-cap */
import {Static, Type} from '@sinclair/typebox';

import {PxDataSchema} from './pxData';
import {PxRequestSchema} from './pxRequest';
import {Nullable} from './schema/nullable';


export const PxInitApiSingleSchema = Type.Object({
  request: PxRequestSchema,
  data: Nullable(PxDataSchema),
});

export type PxInitApiSingle = Static<typeof PxInitApiSingleSchema>;

export const PxInitApiSchema = Type.Array(PxInitApiSingleSchema, {minItems: 1});

export type PxInitApi = Static<typeof PxInitApiSchema>;
