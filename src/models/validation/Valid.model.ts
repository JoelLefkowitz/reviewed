/**
 * @typeParam T - the validated type
 */
export interface Valid<T> {
  valid: true;
  input: unknown;
  parsed: T;
  error: null;
}
