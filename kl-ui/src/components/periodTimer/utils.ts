export const getCurrentEpochSec = (offsetSec: number): number => {
  return (Date.now() - offsetSec * 1000) / 1000;
};
