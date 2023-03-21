/* eslint-disable new-cap */
import {Static, Type} from '@sinclair/typebox';


export const DateOnlySchemaBase = {
  year: Type.Integer({exclusiveMinimum: 0}),
  month: Type.Integer({minimum: 1, maximum: 12}),
  day: Type.Integer({minimum: 1, maximum: 31}),
};

export const DateOnlySchema = Type.Object(DateOnlySchemaBase);

export type DateOnly = Static<typeof DateOnlySchema>;
