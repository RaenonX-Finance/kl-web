export const arrToMap = <T, K extends string | number>(
  arr: T[],
  getKey: (item: T) => K,
): Record<string, T> => Object.fromEntries(arr.map((item) => [getKey(item), item]));
