import {RedisLastPx} from '../../const';


export const initRedis = async () => {
  await RedisLastPx.connect();
};
