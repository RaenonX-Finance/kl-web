export const isCi = (): boolean => {
  return !!process.env.CI && parseInt(process.env.CI) === 1;
};

export const isProduction = (): boolean => {
  return process.env.NODE_ENV === 'production';
};

export const isUsingActualData = (): boolean => {
  const val = process.env.NEXT_PUBLIC_DATA_SOURCE_ACTUAL;

  if (!val) {
    return false;
  }

  return parseInt(val) === 1;
};
