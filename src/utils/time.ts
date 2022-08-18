import {ISOTimezoneString} from '../types/time';


export const getTzOffsetSeconds = (): number => {
  return (new Date()).getTimezoneOffset() * 60;
};

export const updateEpochSecToLocal = (epochSec: number): number => {
  return epochSec - getTzOffsetSeconds();
};

export const getLocalTimezone = (): ISOTimezoneString => {
  const offset = getTzOffsetSeconds();
  const hour = String(Math.abs(Math.floor(offset / 3600))).padStart(2, '0');
  const minutes = String(Math.abs(offset / 60 % 60)).padStart(2, '0');

  if (offset > 0) {
    return `-${hour}:${minutes}`;
  }

  return `+${hour}:${minutes}`;
};
