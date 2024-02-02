import { Validated } from "../models/validation/Validated.model";
import { serialize } from "../services/strings";

/**
 * Invalidate an input
 *
 * @category Factories
 *
 * @typeParam T - the validated type
 * @typeParam U - the validation errors type
 * @param input - the raw input
 * @param error - the validation errors
 *
 * @example
 * ```ts
 * invalidate("1", "Not a number") ->
 *   { valid: false, input: "", parsed: null, error: 'Not a number'};
 * ```
 */
export const invalidate = <T, U>(
  input: unknown,
  error: U,
): Validated<T, U> => ({
  valid: false,
  input,
  parsed: null,
  error,
});

/**
 * Invalidate an input and serialize it with an error message
 *
 * @category Factories
 *
 * @typeParam T - the validated type
 * @param input - the raw input
 * @param reason - the error message
 *
 * @example
 * ```ts
 * invalidateWith("1", "Not a number") ->
 *   { valid: false, input: "", parsed: null, error: 'Not a number: "1"'};
 * ```
 */
export const invalidateWith = <T>(
  input: unknown,
  reason: string,
): Validated<T, string> => invalidate(input, `${reason}: ${serialize(input)}`);
