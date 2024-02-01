import { Validator } from "../models/validation/Validator.model";
import { isNumber } from "./primitives";
import { validateIf } from "../factories/validate";

/**
 * Validate an integer
 *
 * @category Validators
 *
 * @typeParam T - the validated type
 * @param input - the raw input
 *
 * @example
 * ```ts
 * isInteger(1)   -> { valid: true,  parsed: 1, ... }
 * isInteger(0.5) -> { valid: false, error: "Not an integer: 0.5", ... }
 * ```
 */
export const isInteger: Validator<number, string> = (input: unknown) => {
  const number = isNumber(input);

  if (!number.valid) {
    return number;
  }

  return validateIf(
    Number.isInteger(number.parsed),
    input,
    input,
    "Not an integer",
  );
};

/**
 * Validate a natural number
 *
 * @category Validators
 *
 * @typeParam T - the validated type
 * @param input - the raw input
 *
 * @example
 * ```ts
 * isNaturalNumber(1) -> { valid: true,  parsed: 1, ... }
 * isNaturalNumber(0) -> { valid: false, error: "Not a natural number: 0", ... }
 * ```
 */
export const isNaturalNumber: Validator<number, string> = (input: unknown) => {
  const integer = isInteger(input);

  if (!integer.valid) {
    return integer;
  }

  return validateIf(integer.parsed > 0, input, input, "Not a natural number");
};
