import {initPxConfigCache} from './pxConfig';
import {initSourceInfoCache} from './sourceInfo';


export const initMongoDataCache = async () => {
  await Promise.all([
    initSourceInfoCache(),
    initPxConfigCache(),
  ]);
};
