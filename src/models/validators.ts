import { ValidationErrors } from "./errors";

/** @typeParam T - The validated type */
export interface Valid<T> {
  valid: true;
  input: unknown;
  parsed: T;
  error: null;
}

/** @typeParam T - The validated type */
export interface Invalid<T> {
  valid: false;
  input: unknown;
  parsed: null;
  error: ValidationErrors<T>;
}

/** @typeParam T - The validated type */
export type Validated<T> = Valid<T> | Invalid<T>;

/** @typeParam T - The validated type */
export type Validator<T> = (input: unknown) => Validated<T>;

/** @typeParam T - The validated type */
export type Guard<T> = (input: unknown) => input is T;
