export const arrToMap = <T, K extends string | number>(
  arr: T[],
  getKey: (item: T) => K,
): Record<string, T> => Object.fromEntries(arr.map((item) => [getKey(item), item]));

export const insertElement = <T>(a: T[], b: T[], offset: number | null): T[] => {
  if (!a.length) {
    return [...b];
  }

  if (offset) {
    const idxTailStartA = a.length - offset;
    const idxHeadEndA = Math.max(idxTailStartA - b.length, 0);

    return [...a.slice(0, idxHeadEndA), ...b, ...a.slice(idxTailStartA)];
  }

  const idxHeadEndA = a.length - b.length;

  return [...a.slice(0, idxHeadEndA), ...b];
};
