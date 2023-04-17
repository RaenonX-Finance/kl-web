import {PxHistorySingle} from 'kl-web-common/models/api/px/pxHistory';
import {SrLevelModel} from 'kl-web-common/models/api/px/srLevel';

import {pxSrLevel} from './const';


const getLevels = async (symbol: string): Promise<SrLevelModel[]> => {
  return await pxSrLevel.find({symbol}).sort('currentDate', 'desc').toArray();
};

export const getSrLevelBody = async (symbol: string): Promise<PxHistorySingle['supportResistance']> => {
  const levels = await getLevels(symbol);
  return levels.map((model) => model.levels);
};
