import {Static, Type} from '@sinclair/typebox';


export const FastifyErrorSchema = Type.Object({
  error: Type.String(),
});

export type FastifyError = Static<typeof FastifyErrorSchema>;
