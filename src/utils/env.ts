export const isCi = (): boolean => {
  return !!process.env.CI;
};
