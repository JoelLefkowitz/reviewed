import { ValidationErrors } from "../models/errors";
import { serialize } from "../services/strings";

/**
 * Construct a native error message
 *
 * @category Factories
 * @example
 *   fail<{ a: number }>({ a: "Not a number: null" }) >>
 *     Error('{ "a": "Not a number: null"}');
 *
 * @typeParam T - The validated type
 * @param error - The validation errors
 */
export const fail = <T>(error: ValidationErrors<T>): Error =>
  new Error(serialize(error));
