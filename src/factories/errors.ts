import { ValidationErrors } from "../models/validation/ValidationErrors.model";
import { serialize } from "../services/strings";

/**
 * Construct a native error message
 *
 * @category Factories
 *
 * @typeParam T - the validation errors type
 * @param error - the validation errors
 *
 * @example
 * ```ts
 * fail<{ a: number }>({a: "Not a number: null"}) ->
 *   Error('{"a": "Not a number: null');
 * ```
 */
export const fail = <T>(
  error: string | string[] | ValidationErrors<T>,
): Error => new Error(serialize(error));
