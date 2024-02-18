import { ArrayFields } from "../models/fields";

/** @internal */
export const allPass = (arr: boolean[]): boolean =>
  arr.reduce((acc, x) => acc && x, true);

/** @internal */
export const anyPass = (arr: boolean[]): boolean =>
  arr.reduce((acc, x) => acc || x, false);

/** @internal */
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
