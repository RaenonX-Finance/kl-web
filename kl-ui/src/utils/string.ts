export const formatSignedNumber = (num: number, decimalPlaces: number): string => {
  return `${num > 0 ? '+' : ''}${num.toFixed(decimalPlaces)}`;
};

export const addSpaceBetweenAsciiAndNon = (s: string): string => {
  return s
    .replaceAll(/([\u0000-\u007F])([^\u0000-\u007F])/g, '$1 $2')
    .replaceAll(/([^\u0000-\u007F])([\u0000-\u007F])/g, '$1 $2');
};
