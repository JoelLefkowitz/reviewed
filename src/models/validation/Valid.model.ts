/**
 * ...
 *
 * @typeParam T - the validated type
 */
export interface Valid<T> {
  valid: true;
  parsed: T;
  error: null;
}
