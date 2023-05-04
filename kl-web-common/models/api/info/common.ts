/* eslint-disable new-cap */
import {Static, Type} from '@sinclair/typebox';

import {DateOnlySchemaBase} from '../../dateOnly';


export const InfoRequestSchemaBase = {
  ...DateOnlySchemaBase,
  forceScrape: Type.Optional(Type.Boolean()),
};

export const InfoRequestSchema = Type.Object(InfoRequestSchemaBase);

export type InfoRequest = Static<typeof InfoRequestSchema>;
