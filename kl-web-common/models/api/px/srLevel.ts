import {DateOnly} from '../../dateOnly';


export type SrLevelModel = {
  symbol: string,
  lastDate: DateOnly,
  lastClose: number,
  currentDate: DateOnly,
  currentOpen: number,
  levels: number[],
};
