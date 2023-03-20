import {PxUniqueIdentifier} from '../models/api/px/pxMeta';


export type PxIdentifierDetails = {
  symbol: string,
  periodMin: number,
};

export const getIdentifierDetails = (identifier: PxUniqueIdentifier): PxIdentifierDetails => {
  const [symbol, periodMinStr] = identifier.split('@');
  const periodMin = parseInt(periodMinStr);

  return {symbol, periodMin};
};
