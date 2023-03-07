import {PxConfigEntriesGroup, PxConfigEntry, PxConfigUI} from './type';


export const getConfigGroupMap = <K extends keyof T, T>(
  configEntries: PxConfigUI<K, string, T>,
): PxConfigEntriesGroup<K, string, T> => {
  const configEntriesGroup: PxConfigEntriesGroup<K, string, T> = {};

  Object.entries(configEntries).forEach(([key, entry]) => {
    const configEntry = entry as PxConfigEntry<string, T>;

    configEntriesGroup[configEntry.group] = {
      ...(configEntriesGroup[configEntry.group] || {}),
      [key]: configEntry,
    };
  });

  return configEntriesGroup;
};
