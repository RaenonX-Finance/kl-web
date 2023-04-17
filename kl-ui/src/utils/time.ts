import {ISOTimezoneString} from 'kl-web-common/types/time';


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

export const formatTotalSecs = (secLeft: number): string => {
  if (secLeft < 60) {
    return Math.floor(secLeft).toFixed(0);
  }

  if (secLeft < 3600) {
    const min = Math.floor(secLeft / 60);
    const sec = Math.floor(secLeft % 60);
    return `${min.toFixed(0)}:${sec.toFixed(0).padStart(2, '0')}`;
  }

  const hour = Math.floor(secLeft / 3600);
  const min = Math.floor(secLeft % 3600 / 60);
  const sec = Math.floor(secLeft % 60);

  return `${hour}:${min.toFixed(0).padStart(2, '0')}:${sec.toFixed(0).padStart(2, '0')}`;
};
