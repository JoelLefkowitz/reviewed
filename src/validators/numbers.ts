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
export const isInteger: Validator<number> = (input: unknown) => {
  const isNumberCheck = isNumber(input);

  if (!isNumberCheck.valid) {
    return isNumberCheck;
  }

  return validateIf(
    Number.isInteger(isNumberCheck.parsed),
    "Not an integer",
    input,
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
export const isNaturalNumber: Validator<number> = (input: unknown) => {
  const isIntegerCheck = isInteger(input);

  if (!isIntegerCheck.valid) {
    return isIntegerCheck;
  }

  return validateIf(isIntegerCheck.parsed > 0, "Not a natural number", input);
};
