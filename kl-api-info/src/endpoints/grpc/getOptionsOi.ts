import {dateOnlyToString} from 'kl-web-common/utils/date';

import {Logger} from '../../const';
import {getOptionsOi} from '../../controllers/mongo/optionsOi';
import {IPxInfoServer} from '../../protos/pxInfo_grpc_pb';
import {PxInfoReply} from '../../protos/pxInfo_pb';
import {dateToDateOnly} from '../../utils/grpcDate';


export const grpcGetOptionsOiHandler: IPxInfoServer['getOptionsOi'] = async (call): Promise<void> => {
  const symbol = call.request.getSymbol();
  const dateInRequest = call.request.getDate();

  if (!dateInRequest) {
    Logger.error({symbol, date: dateInRequest}, 'Target options OI scraping date invalid for [%s]', symbol);
    throw new Error(`Target options OI scraping date invalid for [${symbol}]`);
  }

  const date = dateToDateOnly(dateInRequest.toObject());
  const dateStr = dateOnlyToString(date);

  Logger.info({symbol, date}, 'Getting options OI of [%s] at %s', symbol, dateStr);
  call.write(new PxInfoReply().setMessage(`Getting options OI of ${symbol} at ${dateStr}`));

  await getOptionsOi({date, symbol, forceScrape: true});

  Logger.info({symbol, date: dateInRequest}, 'Completed getting options OI of [%s] at %s', symbol, dateStr);
  call.write(new PxInfoReply().setMessage(`Completed getting options OI of ${symbol} at ${dateStr}`));

  call.end();
};
