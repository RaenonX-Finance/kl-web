import {Mongo} from 'kl-api-common/const';


const info = Mongo.db('info');

export const infoOpts = info.collection<{}>('options');
