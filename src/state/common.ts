export const wholeStateUpdateReducer = <T>(
  onEachValue?: (value: T) => T,
) => <S extends Record<string, T>, P extends Record<string, T>>(
  state: S, {payload}: {payload: P},
) => {
  // Remove all then add it back
  Object.keys(state).forEach((key) => delete state[key]);
  // False positive of `key` not being able to index on state
  // @ts-ignore
  Object.entries(payload).forEach(([key, value]) => state[key] = onEachValue ? onEachValue(value) : value);
};
