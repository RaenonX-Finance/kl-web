import {infoFinancialEvents, infoFinancialEventsMeta, infoOptionsOi, infoOptionsOiMeta} from './const';


export const initMongoIndexes = async () => {
  await Promise.all([
    infoOptionsOi.createIndex({symbol: 1, date: 1, contractSymbol: 1, strike: 1}, {unique: true}),
    infoOptionsOiMeta.createIndex({symbol: 1, date: 1}, {unique: true}),
    infoFinancialEvents.createIndex({id: 1}, {unique: true}),
    infoFinancialEvents.createIndex({date: -1}),
    infoFinancialEventsMeta.createIndex({date: 1}, {unique: true}),
  ]);
};
