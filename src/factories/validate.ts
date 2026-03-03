import { Validated } from "../models/validators";

/**
 * Validate an input
 *
 * @category Factories
 * @example
 *   validate(1) >>
 *     {
 *       valid: true,
 *       input: 1,
 *       parsed: 1,
 *       error: null,
 *     };
 *
 *   validate("1", 1) >>
 *     {
 *       valid: true,
 *       input: "1",
 *       parsed: 1,
 *       error: null,
 *     };
 *
 * @typeParam T - The validated type
 * @param input  - The raw input
 * @param parsed - The parsed input
 */
export const validate = <T>(
  input: unknown,
  parsed: unknown = input,
): Validated<T> => ({
  valid: true,
  input,
  parsed: parsed as T,
  error: null,
});
