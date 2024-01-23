/**
 * @typeParam T - the validated type
 */
export type ArrayFields<T> = {
  [P in keyof T]: T[P][];
};
