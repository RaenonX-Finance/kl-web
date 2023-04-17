export const getNumberThrow = (str: string): number => {
  const num = Number(str);

  if (Number.isNaN(num)) {
    throw new Error(`${str} is not a number`);
  }

  return num;
};

type GetNumberOpts<T> = {
  str: string,
  onNaN?: (str: string) => void,
  onNaNReturn: T
};

export const getNumber = <T>({str, onNaN, onNaNReturn}: GetNumberOpts<T>): T | number => {
  const num = Number(str);

  if (Number.isNaN(num)) {
    if (onNaN) {
      onNaN(str);
    }
    return onNaNReturn;
  }

  return num;
};
