import {DecimalValue} from '../protos/types/decimalValue_pb';


export const decimalValueToNumber = ({units, nanos}: DecimalValue.AsObject): number => {
  return units + nanos / 1_000_000_000;
};
