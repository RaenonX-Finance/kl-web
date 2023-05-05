import {
  infoDb,
  infoFinancialEvents,
  infoFinancialEventsMeta,
  infoLatestEvents,
  infoOptionsOi,
  infoOptionsOiMeta,
} from './const';


export const initMongoDb = () => {
  return Promise.all([
    initMongoCollections(),
    initMongoIndexes(),
  ]);
};

const initMongoCollections = () => {
  return infoDb.createCollection(
    'latestEventsMeta',
    {capped: true, max: 1, size: 1048576, noResponse: true},
  );
};

const initMongoIndexes = () => {
  return Promise.all([
    infoOptionsOi.createIndex({symbol: 1, date: 1, contractSymbol: 1, strike: 1}, {unique: true}),
    infoOptionsOiMeta.createIndex({symbol: 1, date: 1}, {unique: true}),
    infoFinancialEvents.createIndex({id: 1}, {unique: true}),
    infoFinancialEvents.createIndex({date: -1}),
    infoFinancialEventsMeta.createIndex({date: 1}, {unique: true}),
    infoLatestEvents.createIndex({id: 1}, {unique: true}),
  ]);
};
