import fastJson from 'fast-json-stringify';
import {PxHistorySchema} from 'kl-web-common/models/api/px/pxHistory';
import {PxUniqueIdentifier} from 'kl-web-common/models/api/px/pxMeta';

import {Logger} from '../../const';
import {getPeriods} from '../../controllers/mongo/cached/pxConfig';
import {getCalculatedPx} from '../../controllers/mongo/pxCalc';
import {ISystemEventServer} from '../../protos/systemEvent_grpc_pb';
import {PxSocketEmitter} from '../../types/socket';


const stringifyPxData = fastJson(PxHistorySchema);

const emitPx = async (emitter: PxSocketEmitter, identifier: PxUniqueIdentifier) => {
  const data = await getCalculatedPx([{identifier, limit: 2}]);

  // `stringify` for serializing Decimal 128 value from MongoDB
  // JSON.parse to let socket emitter emit as JSON instead of string
  emitter.to(identifier).emit('calculated', JSON.parse(stringifyPxData(data)));
};

export const grpcCalculatedHandler = (
  emitter: PxSocketEmitter,
): ISystemEventServer['calculated'] => async ({
  request,
}): Promise<void> => {
  const {symbolsList} = request.toObject();

  const event = 'calculated';
  Logger.info({symbols: symbolsList, event}, 'Sending `%s` socket event of [%s]', event, symbolsList);

  await Promise.all(symbolsList.flatMap((symbol) => (
    getPeriods().map((periodMin) => emitPx(emitter, `${symbol}@${periodMin}`))
  )));
};
