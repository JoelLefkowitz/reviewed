/**
 * ...
 *
 * @typeParam T - the validated type
 */
export interface Invalid {
  valid: false;
  parsed: null;
  error: string;
}
