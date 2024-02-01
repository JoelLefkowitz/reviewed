/**
 * @typeParam T - the validated type
 */
export type ValidationErrors<T> =
  T extends Record<string, unknown> ? Partial<Record<keyof T, string>> : never;
