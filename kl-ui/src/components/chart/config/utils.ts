import React from 'react';

import {useSession} from 'next-auth/react';

import {PxConfigEntriesGroup, PxConfigEntry, PxConfigUI} from './type';


export const useConfigGroupMap = <K extends keyof T, T>(
  configEntries: PxConfigUI<K, string, T>,
): PxConfigEntriesGroup<K, string, T> => {
  const [configEntriesGroup, setConfigEntriesGroup] = React.useState<PxConfigEntriesGroup<K, string, T>>({});
  const {data} = useSession();

  React.useEffect(() => {
    const _entriesGroup: PxConfigEntriesGroup<K, string, T> = {};

    Object.entries(configEntries).forEach(([key, entry]) => {
      const configEntry = entry as PxConfigEntry<string, T>;

      const {group, isHidden} = configEntry;

      if (isHidden && isHidden(data?.user)) {
        return;
      }

      _entriesGroup[group] = {
        ...(_entriesGroup[group] || {}),
        [key]: configEntry,
      };
    });

    setConfigEntriesGroup(_entriesGroup);
  }, [data]);

  return configEntriesGroup;
};
