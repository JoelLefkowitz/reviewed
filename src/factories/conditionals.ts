import { Validated } from "../models/validators";
import { invalidateWith } from "./invalidate";
import { validate } from "./validate";

/**
 * Validate an input given a condition
 *
 * @category Factories
 * @example
 *   validateIf(true, "1", 1, "Not a number") >>
 *     {
 *       valid: true,
 *       input: "1",
 *       parsed: 1,
 *       error: null,
 *     };
 *
 * @typeParam T - The validated type
 * @param condition - The validation condition
 * @param input     - The raw input
 * @param parsed    - The parsed input
 * @param reason    - The failure message
 */
export const validateIf = <T>(
  condition: boolean,
  input: unknown,
  parsed: unknown,
  reason: string,
): Validated<T> =>
  condition ? validate(input, parsed) : invalidateWith<T>(reason)(input);
