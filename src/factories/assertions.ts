import { Validator } from "../models/validators";
import { fail } from "../services/errors";

/**
 * Validate an input and throw an error on failure
 *
 * @category Factories
 * @example
 *   assert(isNumber, null) >>
 *   throws: "Not a number: null"
 *
 * @typeParam T - The validated type
 * @param validator - The validator to use
 * @param input     - The raw input
 */
export const assert = <T>(validator: Validator<T>, input: unknown): T => {
  const { valid, parsed, error } = validator(input);

  if (valid) {
    return parsed;
  }

  throw fail(error);
};

/**
 * Augment a validator to throw an error on failure
 *
 * @category Factories
 * @example
 *   asserts(isNumber)(null) >>
 *   throws: "Not a number: null"
 *
 * @typeParam T - The validated type
 * @param validator - The validator to use
 */
export const asserts =
  <T>(validator: Validator<T>) =>
  (input: unknown): T =>
    assert(validator, input);
