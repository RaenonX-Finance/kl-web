import {ProductCategory} from '../../enums/productCategory';
import {PxSource} from '../../enums/source';


export type PxSourceModel = {
  source: PxSource,
  productCategory: ProductCategory,
  enabled: boolean,
  name: string,
  internalSymbol: string,
  externalSymbol: string,
};
