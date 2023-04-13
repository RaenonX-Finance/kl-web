import {PxSource} from '../../enums/source';


export type PxSourceModel = {
  source: PxSource,
  enabled: boolean,
  name: string,
  internalSymbol: string,
  externalSymbol: string,
};
