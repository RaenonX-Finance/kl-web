import {PxData} from '../types/pxData';


export const getPxDataTitle = ({contract, periodSec}: PxData) => (
  `${contract.name} @ ${(periodSec / 60).toFixed(0)}`
);
