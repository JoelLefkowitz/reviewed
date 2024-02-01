/**
 * @typeParam T - the validated type
 */
export type ValidationErrors<T> = Partial<Record<keyof T, string>>;
