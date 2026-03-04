/** @typeParam T - The value type */
export type Mapping<T> = Record<string, T>;

export type Legend = Mapping<string>;

/** @typeParam T - The record type */
/** @typeParam K - The optional type union */
export type Optional<T, K extends keyof T> = Omit<T, K> & {
  [K in keyof T]?: T[K];
};

/** @typeParam T - The record type */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RecordLike<T> = (T extends Record<string, any> ? unknown : never) &
  (T extends ArrayLike<unknown> ? never : unknown);

/** @typeParam T - The record type */
export type Annotated<T> =
  T extends RecordLike<T> ? Partial<Record<keyof T, string>> : never;
