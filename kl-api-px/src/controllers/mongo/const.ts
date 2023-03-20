import {Mongo} from 'kl-api-common/const';
import {PxDataBarModel} from 'kl-web-common/models/api/px/pxDataBar';
import {SourceInfo} from 'kl-web-common/models/api/px/sourceInfo';
import {SrLevelModel} from 'kl-web-common/models/api/px/srLevel';
import {PxConfigModel} from 'kl-web-common/models/config/main';


const px = Mongo.db('px');

export const pxCalc = px.collection<PxDataBarModel>('calc');

export const pxInfo = px.collection<SourceInfo>('info');

export const pxSrLevel = px.collection<SrLevelModel>('srLevel');

export const pxConfig = px.collection<PxConfigModel>('config');
