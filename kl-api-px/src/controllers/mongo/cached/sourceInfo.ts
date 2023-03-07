import {SourceInfoModel} from 'kl-web-common/models/sourceInfo';

import {pxInfo} from '../const';


const sourceInfoCache: {[internalSymbol in string]?: SourceInfoModel} = {};


export const initSourceInfoCache = async () => {
  await pxInfo.find().forEach((doc) => {
    sourceInfoCache[doc.symbol] = doc;
  });
};

export const getSourceInfo = (symbol: string): SourceInfoModel => {
  const ret = sourceInfoCache[symbol];

  if (!ret) {
    throw new Error(`Symbol [${symbol}] does not have source info available`);
  }

  return ret;
};
