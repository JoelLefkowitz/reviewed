import { Validator } from "../models/validation/Validator.model";
import { guard } from "./guards";
import { isArray } from "../validators/arrays";

/**
 * Validate an input with a fallback
 *
 * @category Factories
 *
 * @typeParam T - the validated type
 * @param validator - the validator to use
 * @param fallback - the fallback
 * @param input - the raw inputs
 *
 * @example
 * ```ts
 * validateOr(isNumber, 0, 1)   -> 1
 * validateOr(isNumber, 0, "1") -> 0
 * ```
 */
export const validateOr = <T>(
  validator: Validator<T>,
  fallback: T,
  input: unknown,
): T => {
  const validated = validator(input);
  return validated.valid ? validated.parsed : fallback;
};

/**
 * Validate an array of inputs with a fallback
 *
 * @category Factories
 *
 * @typeParam T - the validated type
 * @param validator - the validator to use
 * @param fallback - the fallback
 * @param input - the raw inputs
 *
 * @example
 * ```ts
 * validateEachOr(isNumber, 0, [1, 2, 3])     -> [1, 2, 3]
 * validateEachOr(isNumber, 0, ["1", 2, "3"]) -> [0, 2, 0]
 * ```
 */
export const validateEachOr = <T>(
  validator: Validator<T>,
  fallback: T,
  input: unknown,
): T[] =>
  guard(isArray)(input)
    ? input.map((i) => validateOr(validator, fallback, i))
    : [];
