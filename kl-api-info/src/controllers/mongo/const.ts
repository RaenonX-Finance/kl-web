import {Mongo} from 'kl-api-common/const';
import {
  FinancialEventEntryModel,
  FinancialEventsMetaModel,
  LatestEventsMetaModel,
} from 'kl-web-common/models/api/info/financialEvents';
import {OptionsOiMetaModel, OptionsOiModel} from 'kl-web-common/models/api/info/optionsOi';


export const infoDb = Mongo.db('info');

export const infoOptionsOi = infoDb.collection<OptionsOiModel>('optionsOi');

export const infoOptionsOiMeta = infoDb.collection<OptionsOiMetaModel>('optionsOiMeta');

export const infoFinancialEvents = infoDb.collection<FinancialEventEntryModel>('financialEvents');

export const infoFinancialEventsMeta = infoDb.collection<FinancialEventsMetaModel>('financialEventsMeta');

export const infoLatestEvents = infoDb.collection<FinancialEventEntryModel>('latestEvents');

export const infoLatestEventsMeta = infoDb.collection<LatestEventsMetaModel>('latestEventsMeta');
