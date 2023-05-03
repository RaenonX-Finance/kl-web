import {Mongo} from 'kl-api-common/const';
import {FinancialEventEntryModel, FinancialEventsMetaModel} from 'kl-web-common/models/api/info/financialEvents';
import {OptionsOiMetaModel, OptionsOiModel} from 'kl-web-common/models/api/info/optionsOi';


const info = Mongo.db('info');

export const infoOptionsOi = info.collection<OptionsOiModel>('optionsOi');

export const infoOptionsOiMeta = info.collection<OptionsOiMetaModel>('optionsOiMeta');

export const infoFinancialEvents = info.collection<FinancialEventEntryModel>('financialEvents');

export const infoFinancialEventsMeta = info.collection<FinancialEventsMetaModel>('financialEventsMeta');
