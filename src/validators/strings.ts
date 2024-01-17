import { Validator } from "../models/validation/Validator.model";
import { invalidate, validate, validateIf } from "../factories/validate";
import { isString } from "./primitives";

/**
 * Validate a boolean string
 *
 * @category Validators
 *
 * @typeParam T - the validated type
 * @param input - the raw input
 *
 * @example
 * ```ts
 * isBooleanString("true")  -> { valid: true,  parsed: true, ... }
 * isBooleanString("false") -> { valid: true,  parsed: false, ... }
 * isBooleanString(1)       -> { valid: false, error: "Not a string: 1", ... }
 * isBooleanString("")      -> { valid: false, error: 'Not a boolean: ""', ... }
 * ```
 */
export const isBooleanString: Validator<boolean> = (input: unknown) => {
  const isStringCheck = isString(input);

  if (!isStringCheck.valid) {
    return isStringCheck;
  }

  return ["true", "false"].includes(isStringCheck.parsed)
    ? validate(input, isStringCheck.parsed === "true")
    : invalidate(input, "Not a boolean");
};

/**
 * Validate a number string
 *
 * @category Validators
 *
 * @typeParam T - the validated type
 * @param input - the raw input
 *
 * @example
 * ```ts
 * isNumberString("1")        -> { valid: true,  parsed: 1, ... }
 * isNumberString("")         -> { valid: false, error: 'Not a number: ""', ... }
 * isNumberString("NaN")      -> { valid: false, error: 'Not a number: "NaN"', ... }
 * isNumberString("Infinity") -> { valid: false, error: 'Not a number: "Infinity"', ... }
 * ```
 */
export const isNumberString: Validator<number> = (input: unknown) => {
  const isStringCheck = isString(input);

  if (!isStringCheck.valid) {
    return isStringCheck;
  }

  const parsed = parseFloat(isStringCheck.parsed);

  return validateIf(isFinite(parsed), "Not a number", input, parsed);
};

/**
 * Validate an integer string
 *
 * @category Validators
 *
 * @typeParam T - the validated type
 * @param input - the raw input
 *
 * @example
 * ```ts
 * isIntegerString("1")   -> { valid: true,  parsed: 1, ... }
 * isIntegerString("")    -> { valid: false, error: 'Not a number: ""', ... }
 * isIntegerString("0.5") -> { valid: false, error: 'Not an integer: "0.5"', ... }
 * ```
 */
export const isIntegerString: Validator<number> = (input: unknown) => {
  const isNumberStringCheck = isNumberString(input);

  if (!isNumberStringCheck.valid) {
    return isNumberStringCheck;
  }

  return validateIf(
    Number.isInteger(isNumberStringCheck.parsed),
    "Not an integer",
    input,
    isNumberStringCheck.parsed,
  );
};

/**
 * Validate a natural number string
 *
 * @category Validators
 *
 * @typeParam T - the validated type
 * @param input - the raw input
 *
 * @example
 * ```ts
 * isNaturalNumberString("1")   -> { valid: true,  parsed: 1, ... }
 * isNaturalNumberString("")    -> { valid: false, error: 'Not a number: ""', ... }
 * isNaturalNumberString("0.5") -> { valid: false, error: 'Not an integer: "0.5"', ... }
 * isNaturalNumberString("0")   -> { valid: false, error: 'Not a natural number: "0"', ... }
 * ```
 */
export const isNaturalNumberString: Validator<number> = (input: unknown) => {
  const isIntegerStringCheck = isIntegerString(input);

  if (!isIntegerStringCheck.valid) {
    return isIntegerStringCheck;
  }

  return validateIf(
    isIntegerStringCheck.parsed > 0,
    "Not a natural number",
    input,
    isIntegerStringCheck.parsed,
  );
};
