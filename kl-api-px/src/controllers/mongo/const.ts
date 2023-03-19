import {PxConfigModel} from 'kl-web-common/models/config/main';
import {PxDataBarModel} from 'kl-web-common/models/pxDataBar';
import {SourceInfo} from 'kl-web-common/models/sourceInfo';
import {SrLevelModel} from 'kl-web-common/models/srLevel';

import {Mongo} from '../../const';


const px = Mongo.db('px');

export const pxCalc = px.collection<PxDataBarModel>('calc');

export const pxInfo = px.collection<SourceInfo>('info');

export const pxSrLevel = px.collection<SrLevelModel>('srLevel');

export const pxConfig = px.collection<PxConfigModel>('config');
