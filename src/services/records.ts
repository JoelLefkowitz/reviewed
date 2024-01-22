export const mapRecord = <T extends string, U, V>(
  map: (x: U) => V,
  record: Record<T, U>,
): Record<T, V> => {
  const entries = Object.entries(record) as [T, U][];
  const errors = entries.map(([k, v]) => [k, map(v)]);
  return Object.fromEntries(errors) as Record<T, V>;
};

export const reduceRecord = <T extends string, U, V>(
  filter: (x: U) => boolean,
  map: (x: U) => V,
  record: Record<T, U>,
): Partial<Record<T, V>> => {
  const fold = (acc: [T, V][], [k, v]: [T, U]) =>
    filter(v) ? [...acc, [k, map(v)] as [T, V]] : acc;

  const entries = Object.entries(record) as [T, U][];
  const reduced = entries.reduce(fold, []);
  return Object.fromEntries(reduced) as Partial<Record<T, V>>;
};
