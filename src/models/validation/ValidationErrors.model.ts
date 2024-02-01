type NotArray<T> = T extends Array<unknown> ? never : unknown;

/**
 * @typeParam T - the validated type
 */
export type ValidationErrors<T> = T extends NotArray<T> &
  Record<string, unknown>
  ? Partial<Record<keyof T, string>>
  : never;
