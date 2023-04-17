export const sum = (arr: number[]): number => {
  return arr.reduce((acc, c) => acc + c, 0);
};

export const avg = (arr: number[]): number => {
  return sum(arr) / arr.length;
};
