import {downRange, upRange} from './const';


export const isStrikeInRange = (strikePx: number, currentPx: number | null): boolean => {
  if (!currentPx) {
    return true;
  }

  if (strikePx > currentPx) {
    return strikePx <= currentPx + upRange;
  }

  return strikePx >= currentPx - downRange;
};
