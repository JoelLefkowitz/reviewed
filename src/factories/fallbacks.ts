import { Validator } from "../models/validators";
import { guard } from "./guards";
import { isArray } from "../validators/arrays";

/**
 * Validate an input with a fallback
 *
 * @category Factories
 * @example
 *   validateOr(isNumber, 0)(1) >> 1;
 *   validateOr(isNumber, 0)("1") >> 0;
 *
 * @typeParam T - The validated type
 * @param validator - The validator to use
 * @param fallback  - The fallback
 */
export const validateOr =
  <T>(validator: Validator<T>, fallback: T) =>
  (input: unknown): T => {
    const validated = validator(input);
    return validated.valid ? validated.parsed : fallback;
  };

/**
 * Validate an array of inputs with a fallback
 *
 * @category Factories
 * @example
 *   validateEachOr(isNumber, 0)([1, 2, 3]) >> [1, 2, 3];
 *   validateEachOr(isNumber, 0)(["1", 2, "3"]) >> [0, 2, 0];
 *
 * @typeParam T - The validated type
 * @param validator - The validator to use
 * @param fallback  - The fallback
 */
export const validateEachOr =
  <T>(validator: Validator<T>, fallback: T) =>
  (input: unknown): T[] =>
    guard(isArray)(input) ? input.map(validateOr(validator, fallback)) : [];
