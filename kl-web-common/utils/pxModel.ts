import {PxRequestModel} from '../models/pxRequest';


type PxRequestDetails = PxRequestModel & {
  symbol: string,
  periodMin: number,
};

export const getRequestDetails = (request: PxRequestModel): PxRequestDetails => {
  const [symbol, periodMinStr] = request.identifier.split('@');
  const periodMin = parseInt(periodMinStr);

  return {...request, symbol, periodMin};
};
