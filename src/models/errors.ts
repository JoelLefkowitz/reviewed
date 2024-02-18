/** @internal */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RecordLike<T> = (T extends Record<string, any> ? unknown : never) &
  (T extends ArrayLike<unknown> ? never : unknown);

/** @typeParam T - The validated type */
export type ValidationErrors<T> =
  | string
  | string[]
  | (T extends RecordLike<T> ? Partial<Record<keyof T, string>> : never);
