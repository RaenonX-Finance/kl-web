import {ISOTimestampWithTimezone} from 'kl-web-common/types/time';

import {DatetimeLocalValue} from '../../../../types/misc';
import {getTzOffsetSeconds} from '../../../../utils/time';


export const addTzOffsetOnISODatetime = (isoTimestampUTC: ISOTimestampWithTimezone): DatetimeLocalValue => {
  const utcOriginal = new Date(`${isoTimestampUTC.slice(0, 16)}Z`);

  const dateWithTzOffset = new Date(utcOriginal.getTime() - getTzOffsetSeconds() * 1000);

  return dateWithTzOffset.toISOString().slice(0, 16) as DatetimeLocalValue;
};
