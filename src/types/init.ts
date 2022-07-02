export type CustomSrLevel = {
  level: number,
};

export type CustomSrLevelDict = {[productSymbol in string]?: CustomSrLevel[]};

export type InitData = {
  customSrLevelDict: CustomSrLevelDict,
};
