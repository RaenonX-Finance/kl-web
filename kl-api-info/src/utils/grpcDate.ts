import {DateOnly} from 'kl-web-common/models/dateOnly';

import {Date} from '../protos/types/date_pb';


export const dateToDateOnly = ({year, month, day}: Date.AsObject): DateOnly => {
  return {year, month, day};
};
