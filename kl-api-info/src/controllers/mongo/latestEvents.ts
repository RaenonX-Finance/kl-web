import {FinancialEventData} from 'kl-web-common/models/api/info/financialEvents';

import {infoLatestEvents, infoLatestEventsMeta} from './const';


type UpdateLatestEventsInDbOpts = {
  financialEvents: FinancialEventData,
};

export const updateLatestEventsInDb = ({financialEvents}: UpdateLatestEventsInDbOpts) => {
  return Promise.all([
    infoLatestEvents.bulkWrite(financialEvents.map(({id, date, lastUpdate, ...event}) => ({
      updateOne: {
        filter: {id},
        update: {
          $set: {
            ...event,
            date: new Date(date),
            lastUpdate: new Date(lastUpdate),
          },
        },
        upsert: true,
      },
    }))),
    infoLatestEventsMeta.updateOne(
      {},
      {$set: {lastUpdate: new Date()}},
      {upsert: true},
    ),
  ]);
};
