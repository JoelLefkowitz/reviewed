import { Validated, ValidationErrors, Validator } from "../models/validators";
import { serialize } from "../services/strings";

/**
 * Invalidate an input
 *
 * @category Factories
 * @example
 *   invalidate("1", "Not a number") >>
 *     {
 *       valid: false,
 *       input: "",
 *       parsed: null,
 *       error: "Not a number",
 *     };
 *
 * @typeParam T - The validated type
 * @param input - The raw input
 * @param error - The validation errors
 */
export const invalidate = <T>(
  input: unknown,
  error: ValidationErrors<T>,
): Validated<T> => ({
  valid: false,
  input,
  parsed: null,
  error,
});

/**
 * Invalidate an input and serialize it with a failure message
 *
 * @category Factories
 * @example
 *   invalidateWith("Not a number")("1") >>
 *     {
 *       valid: false,
 *       input: "",
 *       parsed: null,
 *       error: 'Not a number: "1"',
 *     };
 *
 * @typeParam T - The validated type
 * @param reason - The failure message
 */
export const invalidateWith =
  <T>(reason: string): Validator<T> =>
  (input: unknown) =>
    invalidate(input, `${reason}: ${serialize(input)}`);
