import {InitAccountData} from './init';


export type PxCheckAuthMessage = {
  token: string | undefined,
};

export type AccountSocketC2SEvents = {
  init: (token: string) => void,
  ping: () => void,
  auth: (auth: PxCheckAuthMessage) => void,
};

export type AccountSocketS2CEvents = {
  init: (initData: InitAccountData) => void,
  ping: () => void,
  error: (message: string) => void,
  auth: () => void,
};
