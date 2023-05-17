/* eslint-disable new-cap */
import {Static, TString, Type} from '@sinclair/typebox';

import {ISOTimestampUtc} from '../../types/time';


export interface TISOTimestampUtc extends TString {
  static: ISOTimestampUtc;
}

export const IsoTimestampUtcSchema = Type.Unsafe<Static<TISOTimestampUtc>>(Type.String({
  type: 'string',
  format: 'date-time',
}));
