import {getNumberThrow} from './parse';
import {DateOnly} from '../models/dateOnly';
import {ISODateString} from '../types/time';


export const toDateOnly = (date: Date): DateOnly => {
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
  };
};

export const dateOnlyToString = (date: DateOnly) => {
  return `${date.year}-${date.month.toString().padStart(2, '0')}-${date.day.toString().padStart(2, '0')}`;
};

export const stringToDateOnly = (dateString: ISODateString): DateOnly => {
  const [year, month, day] = dateString.split('-', 3);

  return {year: getNumberThrow(year), month: getNumberThrow(month), day: getNumberThrow(day)};
};
