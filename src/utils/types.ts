export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type KeysOfType<T, KT> = {
  [K in keyof T]: T[K] extends KT ? K : never
}[keyof T];

export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends Array<any> ? T[K] : DeepPartial<T[K]>;
};

export type RecursiveArray<T> = Array<RecursiveArray<T> | T>;

export type JsonValue =
  string |
  number |
  boolean |
  {[x in string]?: JsonValue} |
  JsonValue[];
