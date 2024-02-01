type NotArrayLike<T> = T extends ArrayLike<unknown> ? never : unknown;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RecordLike<T> = T extends Record<string, any> ? unknown : never;

/**
 * @typeParam T - the validated type
 */
export type ValidationErrors<T> = T extends NotArrayLike<T> & RecordLike<T>
  ? Partial<Record<keyof T, string>>
  : never;
