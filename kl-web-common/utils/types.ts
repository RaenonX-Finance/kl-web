export type ChangeTypeOfKeysOnValueType<T extends object, KT, T2> = {
  [key in keyof T]: T[key] extends KT ? T2 : T[key]
};
