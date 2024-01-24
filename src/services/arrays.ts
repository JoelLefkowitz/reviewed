import { ArrayFields } from "../models/fields/ArrayFields.model";

export const all = (arr: boolean[]): boolean =>
  arr.reduce((acc, x) => acc && x, true);

export const any = (arr: boolean[]): boolean =>
  arr.reduce((acc, x) => acc || x, false);

export const group = <T>(records: T[]): ArrayFields<T> =>
  records.reduce(
    (acc, x) =>
      Object.entries(x as Record<string, unknown>).reduce(
        (i, [k, v]) => ({ ...i, [k]: [...(i[k as keyof T] ?? []), v] }),
        acc,
      ),
    {} as ArrayFields<T>,
  );
