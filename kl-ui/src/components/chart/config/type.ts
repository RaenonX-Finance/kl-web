export type PxConfigEntry<G extends string, T> = {
  title: string,
  group: G,
  isDisabled?: (config: T) => boolean,
  step?: number,
  min?: number,
  tips?: string,
};

export type PxConfigUI<K extends keyof T, G extends string, T> = {
  [key in K]: PxConfigEntry<G, T>
};

export type PxConfigEntriesGroup<K extends keyof T, G extends string, T> = {
  [group in G]: {
    [key in K]: PxConfigEntry<G, T>
  }
};
