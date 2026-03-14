import { Validated, Validator } from "../models/validators";
import { guard } from "../factories/guards";
import { isArray } from "../validators/arrays";

/**
 * Validate an input with a fallback
 *
 * @category Services
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
 * Provide a fallback to a validated result
 *
 * @category Services
 * @example
 *   validatedOr(isNumber(1), 0) >> 1;
 *   validatedOr(isNumber("1"), 0) >> 0;
 *
 * @typeParam T - The validated type
 * @param result   - The validated result
 * @param fallback - The fallback
 */
export const validatedOr = <T>(
  { valid, parsed }: Validated<T>,
  fallback: T,
): T => (valid ? parsed : fallback);

/**
 * Validate an array of inputs with a fallback
 *
 * @category Services
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
    guard(isArray, input) ? input.map(validateOr(validator, fallback)) : [];
