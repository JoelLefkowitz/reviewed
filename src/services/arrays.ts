import { ArrayInline } from "../models/validation/Validated.model";

export const all = (arr: boolean[]): boolean =>
  arr.reduce((acc, x) => acc && x, true);

export const any = (arr: boolean[]): boolean =>
  arr.reduce((acc, x) => acc || x, false);

export const group = <T>(records: T[]): ArrayInline<T> =>
  records.reduce(
    (acc, x) =>
      Object.entries(x as Record<string, unknown>).reduce(
        (i, [k, v]) => ({ ...i, [k]: [...(i[k as keyof T] ?? []), v] }),
        acc,
      ),
    {} as ArrayInline<T>,
  );
