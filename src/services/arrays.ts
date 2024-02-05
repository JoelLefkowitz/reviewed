import { ArrayFields } from "../models/fields/ArrayFields.model";

export const all = (arr: boolean[]): boolean =>
  arr.reduce((acc, x) => acc && x, true);

export const any = (arr: boolean[]): boolean =>
  arr.reduce((acc, x) => acc || x, false);

export const group = <T extends object>(records: T[]) =>
  records.reduce<ArrayFields<T>>(
    (acc, x) =>
      Object.entries(x).reduce<ArrayFields<T>>(
        (i, [k, v]) => ({
          ...i,
          [k]: [...((i as Record<string, unknown[]>)[k] ?? []), v],
        }),
        acc,
      ),

    // eslint-disable-next-line @typescript-eslint/prefer-reduce-type-parameter
    {} as ArrayFields<T>,
  );
