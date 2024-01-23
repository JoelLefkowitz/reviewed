export const mapRecord = <T extends string, U, V>(
  map: (x: U) => V,
  record: Record<T, U>,
): Record<T, V> => {
  const reduced = (Object.entries(record) as [T, U][]).reduce(
    (acc: [T, V][], [k, v]: [T, U]) => [...acc, [k, map(v)] as [T, V]],
    [],
  );

  return Object.fromEntries(reduced) as Record<T, V>;
};

export const reduceRecord = <T extends string, U, V>(
  map: (x: U) => V,
  filter: (x: U) => boolean,
  record: Record<T, U>,
): Partial<Record<T, V>> => {
  const reduced = (Object.entries(record) as [T, U][]).reduce(
    (acc: [T, V][], [k, v]: [T, U]) =>
      filter(v) ? [...acc, [k, map(v)] as [T, V]] : acc,
    [],
  );

  return Object.fromEntries(reduced) as Partial<Record<T, V>>;
};

export const pickField = <T extends string, U, V extends keyof U>(
  field: V,
  record: Record<T, U>,
): Record<T, U[V]> => mapRecord((x) => x[field], record);
