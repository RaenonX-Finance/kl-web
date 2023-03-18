/* eslint-disable new-cap */
import {Static, TSchema, Type} from '@sinclair/typebox';


export const Nullable = <T extends TSchema>(schema: T) => {
  return Type.Unsafe<Static<T> | null>({...schema, nullable: true});
};
