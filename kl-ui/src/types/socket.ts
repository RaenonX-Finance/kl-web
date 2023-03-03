import {InitAccountData} from './init';


export type PxCheckAuthMessage = {
  token: string | undefined,
};

export type GeneralSocketC2SEvents = {
  init: (token: string) => void,
  ping: () => void,
  auth: (auth: PxCheckAuthMessage) => void,
};

export type GeneralSocketS2CEvents = {
  init: (initData: InitAccountData) => void,
  error: (message: string) => void,
  auth: () => void,
};
