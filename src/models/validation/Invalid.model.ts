/**
 * @typeParam T - the validated type
 */
export interface Invalid<T> {
  valid: false;
  input: unknown;
  parsed: null;
  error: T;
}
