import { Validator } from "../models/validation/Validator.model";
import { isNumber, isString } from "./primitives";
import { validateIf } from "../factories/validate";

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
 * isBooleanString("true")  -> { valid: true,  parsed: true, ... };
 * isBooleanString("false") -> { valid: true,  parsed: false, ... };
 * isBooleanString(1)       -> { valid: false, error: "Not a string: 1", ... };
 * isBooleanString("")      -> { valid: false, error: 'Not a boolean: ""', ... };
 * ```
 */
export const isBooleanString: Validator<boolean, string> = (input: unknown) => {
  const string = isString(input);

  if (!string.valid) {
    return string;
  }

  return validateIf(
    ["true", "false"].includes(string.parsed),
    input,
    input === "true",
    "Not a boolean string",
  );
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
 * isNumberString("1")        -> { valid: true,  parsed: 1, ... };
 * isNumberString("")         -> { valid: false, error: 'Not a number: ""', ... };
 * isNumberString("NaN")      -> { valid: false, error: 'Not a number: "NaN"', ... };
 * isNumberString("Infinity") -> { valid: false, error: 'Not a number: "Infinity"', ... };
 * ```
 */
export const isNumberString: Validator<number, string> = (input: unknown) => {
  const string = isString(input);

  if (!string.valid) {
    return string;
  }

  const parsed = parseFloat(string.parsed);
  const number = isNumber(isNaN(parsed) ? input : parsed);

  return validateIf(number.valid, input, number.parsed, "Not a number string");
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
 * isIntegerString("1")   -> { valid: true,  parsed: 1, ... };
 * isIntegerString("")    -> { valid: false, error: 'Not a number: ""', ... };
 * isIntegerString("0.5") -> { valid: false, error: 'Not an integer: "0.5"', ... };
 * ```
 */
export const isIntegerString: Validator<number, string> = (input: unknown) => {
  const numberString = isNumberString(input);

  if (!numberString.valid) {
    return numberString;
  }

  return validateIf(
    Number.isInteger(numberString.parsed),
    input,
    numberString.parsed,
    "Not an integer string",
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
 * isNaturalNumberString("1")   -> { valid: true,  parsed: 1, ... };
 * isNaturalNumberString("")    -> { valid: false, error: 'Not a number: ""', ... };
 * isNaturalNumberString("0.5") -> { valid: false, error: 'Not an integer: "0.5"', ... };
 * isNaturalNumberString("0")   -> { valid: false, error: 'Not a natural number: "0"', ... };
 * ```
 */
export const isNaturalNumberString: Validator<number, string> = (
  input: unknown,
) => {
  const integerString = isIntegerString(input);

  if (!integerString.valid) {
    return integerString;
  }

  return validateIf(
    integerString.parsed > 0,
    input,
    integerString.parsed,
    "Not a natural number string",
  );
};
