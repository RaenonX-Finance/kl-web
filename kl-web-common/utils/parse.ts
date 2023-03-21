export const getNumber = (str: string): number => {
  const num = Number(str);

  if (Number.isNaN(num)) {
    throw new Error(`${str} is not a number`);
  }

  return num;
};
