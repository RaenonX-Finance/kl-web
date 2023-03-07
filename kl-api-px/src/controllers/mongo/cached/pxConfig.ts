import {PxConfigModel} from 'kl-web-common/models/config/main';
import {PxSourceModel} from 'kl-web-common/models/config/source';

import {pxConfig} from '../const';


let configCache: PxConfigModel | undefined = undefined;

const sourceMap: {[internalSymbol in string]?: PxSourceModel} = {};

export const initPxConfigCache = async () => {
  const configModel = await pxConfig.findOne();

  if (!configModel) {
    throw new Error('Px config needs to be initialized by starting `KL.Calc` or `KL.PxParse`.');
  }

  configCache = configModel;

  configModel.sources.forEach((source) => sourceMap[source.internalSymbol] = source);
};

export const getSource = (symbol: string): PxSourceModel => {
  const ret = sourceMap[symbol];

  if (!ret) {
    throw new Error(`Symbol [${symbol}] does not have source config available`);
  }

  return ret;
};

export const getConfig = (): PxConfigModel => {
  if (!configCache) {
    throw new Error('Px config model not loaded or failed to load');
  }

  return configCache;
};
