import {DateOnly} from './dateOnly';
import {SrLevelType} from '../enums/srLevelType';


export type SrLevelModel = {
  type: SrLevelType,
  symbol: string,
  lastDate: DateOnly,
  lastClose: number,
  currentDate: DateOnly,
  currentOpen: number,
  levels: number[],
};
