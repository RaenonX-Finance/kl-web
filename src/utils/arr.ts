export const arrToMap = <T, K extends string | number>(
  arr: T[],
  getKey: (item: T) => K,
): Record<string, T> => Object.fromEntries(arr.map((item) => [getKey(item), item]));

export const mergeThenSort = <T>(original: T[], newer: T[], getSortBasis: (item: T) => number): T[] => {
  return Object.values(Object.fromEntries(original.concat(...newer).map((item) => [getSortBasis(item), item])))
    .sort((a, b) => getSortBasis(a) - getSortBasis(b));
};
