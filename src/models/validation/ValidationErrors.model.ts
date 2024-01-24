/**
 * @typeParam T - the validated type
 */
export type ValidationErrors<T> =
  | string
  | string[]
  | Partial<Record<keyof T, string>>;
