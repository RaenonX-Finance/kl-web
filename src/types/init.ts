export type CustomSrLevel = {
  level: number,
  strong: boolean,
};

export type CustomSrLevelDict = {[productSymbol in string]: CustomSrLevel[]};

export type InitData = {
  customSrLevelDict: CustomSrLevelDict,
};
