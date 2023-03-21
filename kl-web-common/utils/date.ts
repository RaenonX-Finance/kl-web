import {DateOnly} from '../models/dateOnly';


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
