import {PeriodInfo, ProductInfo} from './data';
import {UserConfigModel} from './user';


export type CustomSrLevel = {
  level: number,
};

export type CustomSrLevelDict = {[productSymbol in string]?: CustomSrLevel[]};

/**
 * Initial data sent from the backend.
 *
 * This should have the same schema as `InitData` in the backend.
 */
export type InitData = {
  customSrLevelDict: CustomSrLevelDict,
  config: UserConfigModel,
  products: ProductInfo[],
  periods: PeriodInfo[],
};
