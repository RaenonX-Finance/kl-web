import {dateOnlyToString} from 'kl-web-common/utils/date';

import {Logger} from '../../const';
import {getFinancialEvents} from '../../controllers/mongo/financialEvents';
import {IPxInfoServer} from '../../protos/pxInfo_grpc_pb';
import {PxInfoReply} from '../../protos/pxInfo_pb';
import {dateToDateOnly} from '../../utils/grpcDate';


export const grpcGetFinancialEventsHandler: IPxInfoServer['getFinancialEvents'] = async (call): Promise<void> => {
  const dateInRequest = call.request.getDate();

  if (!dateInRequest) {
    Logger.error({date: dateInRequest}, 'Target financial events scraping date invalid');
    throw new Error('Target financial events scraping date invalid');
  }

  const date = dateToDateOnly(dateInRequest.toObject());
  const dateStr = dateOnlyToString(date);

  Logger.info({date}, 'Getting financial events at %s', dateStr);
  call.write(new PxInfoReply().setMessage(`Getting financial events at ${dateStr}`));

  await getFinancialEvents({
    date,
    forceScrape: true,
    onLog: (log) => call.write(new PxInfoReply().setMessage(log)),
  });

  Logger.info({date}, 'Completed getting financial events at %s', dateStr);
  call.write(new PxInfoReply().setMessage(`Completed getting financial events at ${dateStr}`));

  call.end();
};
