export const updateEpochSecToLocal = (epochSec: number): number => {
  return epochSec - (new Date()).getTimezoneOffset() * 60;
};


export const getCurrentLocalEpochOfPeriod = (periodSec: number): number => {
  return updateEpochSecToLocal(Math.floor((new Date().getTime() / 1000) / periodSec) * periodSec);
};
