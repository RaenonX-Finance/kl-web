import {Mongo} from 'kl-api-common/const';
import {OptionsOiLastUpdateModel, OptionsOiModel} from 'kl-web-common/models/api/info/optionsOi';


const info = Mongo.db('info');

export const infoOptionsOi = info.collection<OptionsOiModel>('optionsOi');

export const infoOptionsOiLastUpdate = info.collection<OptionsOiLastUpdateModel>('optionsOiLastUpdate');
