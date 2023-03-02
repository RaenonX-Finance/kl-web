import {SrLevelType} from 'kl-web-common/enums/srLevelType';
import {PxHistorySingle} from 'kl-web-common/models/pxHistory';
import {SrLevelModel} from 'kl-web-common/models/srLevel';

import {pxSrLevel} from './const';


const getLevels = async (symbol: string, type: SrLevelType): Promise<SrLevelModel[]> => {
  return await pxSrLevel.find({symbol, type}).sort('currentDate', 'desc').toArray();
};

const getPrimary = async (symbol: string): Promise<number[][]> => {
  const levels = await getLevels(symbol, 'Primary');
  return levels.map((model) => model.levels);
};

const getSecondary = async (symbol: string): Promise<number[]> => {
  const levels = await getLevels(symbol, 'Secondary');
  return levels.flatMap((model) => model.levels);
};

export const getSrLevelBody = async (symbol: string): Promise<PxHistorySingle['supportResistance']> => {
  const [groups, basic] = await Promise.all([getPrimary(symbol), getSecondary(symbol)]);

  return {groups, basic};
};
