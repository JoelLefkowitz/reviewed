/** @typeParam T - The record type */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RecordLike<T> = (T extends Record<string, any> ? unknown : never) &
  (T extends ArrayLike<unknown> ? never : unknown);

/** @typeParam T - The record type */
export type Annotated<T> =
  T extends RecordLike<T> ? Partial<Record<keyof T, string>> : never;
