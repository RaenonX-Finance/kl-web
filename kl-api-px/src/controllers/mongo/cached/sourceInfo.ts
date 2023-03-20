import {SourceInfo} from 'kl-web-common/models/api/px/sourceInfo';

import {pxInfo} from '../const';


const sourceInfoCache: {[internalSymbol in string]?: SourceInfo} = {};


export const initSourceInfoCache = async () => {
  await pxInfo.find().forEach((doc) => {
    sourceInfoCache[doc.symbol] = doc;
  });
};

export const getSourceInfo = (symbol: string): SourceInfo => {
  const ret = sourceInfoCache[symbol];

  if (!ret) {
    throw new Error(`Symbol [${symbol}] does not have source info available`);
  }

  return ret;
};
