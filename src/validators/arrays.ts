import { Validated } from "../models/validation/Validated.model";
import { Validator } from "../models/validation/Validator.model";
import { isNumber, isString } from "./primitives";
import { validateIf } from "../factories/validate";

/**
 * Validate an array
 *
 * @category Validators
 *
 * @typeParam T - the validated type
 * @param input - the raw input
 *
 * @example
 * ```ts
 * isArray([])  -> { valid: true, parsed: [], ... }
 * isArray([1]) -> { valid: true, parsed: [1], ... }
 * isArray("")  -> { valid: false, error: 'Not an array: ""', ... }
 * ```
 */
export const isArray: Validator<unknown[]> = (input: unknown) =>
  validateIf(Array.isArray(input), "Not an array", input);

/**
 * Validate a non empty array
 *
 * @category Validators
 *
 * @typeParam T - the validated type
 * @param input - the raw input
 *
 * @example
 * ```ts
 * isNonEmptyArray([1]) -> { valid: true,  parsed: [1], ... }
 * isNonEmptyArray("")  -> { valid: false, error: 'Not an array: ""', ... }
 * isNonEmptyArray([])  -> { valid: false, error: "Not a non empty array: []", ... }
 * ```
 */
export const isNonEmptyArray: Validator<unknown[]> = (input: unknown) => {
  const isArrayCheck = isArray(input);

  if (!isArrayCheck.valid) {
    return isArrayCheck;
  }

  return validateIf(
    isArrayCheck.parsed.length > 0,
    "Not a non empty array",
    input
  );
};

/**
 * Validate an array of numbers
 *
 * @category Validators
 *
 * @typeParam T - the validated type
 * @param input - the raw input
 *
 * @example
 * ```ts
 * isNumberArray([])   -> { valid: true,  parsed: [], ... }
 * isNumberArray([1])  -> { valid: true,  parsed: [1], ... }
 * isNumberArray("")   -> { valid: false, error: 'Not an array: ""', ... }
 * isNumberArray([""]) -> { valid: false, error: 'Not a number array: [""]', ... }
 * ```
 */
export const isNumberArray: Validator<number[]> = (input: unknown) => {
  const isArrayCheck = isArray(input);

  if (!isArrayCheck.valid) {
    return isArrayCheck;
  }

  return validateIf(
    isArrayCheck.parsed.every((i) => isNumber(i).valid),
    "Not an array of numbers",
    input
  );
};

/**
 * Validate an array of strings
 *
 * @category Validators
 *
 * @typeParam T - the validated type
 * @param input - the raw input
 *
 * @example
 * ```ts
 * isStringArray([])   -> { valid: true,  parsed: [], ... }
 * isStringArray([""]) -> { valid: true,  parsed: [""], ... }
 * isStringArray("")   -> { valid: false, error: 'Not an array: ""', ... }
 * isStringArray([1])  -> { valid: false, error: "Not a number array: [1]", ... }
 * ```
 */
export const isStringArray: Validator<string[]> = (input: unknown) => {
  const isArrayCheck = isArray(input);

  if (!isArrayCheck.valid) {
    return isArrayCheck;
  }

  return validateIf(
    isArrayCheck.parsed.every((i) => isString(i).valid),
    "Not an array of strings",
    input
  );
};

/**
 * Validate an input is one of a list of options
 *
 * @category Validators
 *
 * @typeParam T - the validated type
 * @param input - the raw input
 *
 * @example
 * ```ts
 * isOneOf([1, 2, 3], 1) -> { valid: true, parsed: 1, ... }
 *
 * isOneOf([1, 2, 3], 4) ->
 *   { valid: false, error: "Not one of [1,2,3]: 4", ... }
 * ```
 */
export const isOneOf = <T>(options: T[], input: unknown): Validated<T> =>
  validateIf(
    options.includes(input as T),
    `Not one of ${JSON.stringify(options)}`,
    input
  );

/**
 * Validate an input is an array of elements from a list of options
 *
 * @category Validators
 *
 * @typeParam T - the validated type
 * @param input - the raw input
 *
 * @example
 * ```ts
 * isArrayOf([1, 2, 3], [3, 1]) -> { valid: true, parsed: [3, 1], ... }
 *
 * isArrayOf([1, 2, 3], [3, 1, 4]) ->
 *   { valid: false, error: "Not an array of [1,2,3]: [3,1,4]", ... }
 * ```
 */
export const isArrayOf = <T>(options: T[], input: unknown): Validated<T> => {
  const isArrayCheck = isArray(input);

  if (!isArrayCheck.valid) {
    return isArrayCheck;
  }

  return validateIf(
    !isArrayCheck.parsed.some((i) => !options.includes(i as T)),
    `Not an array of ${JSON.stringify(options)}`,
    input
  );
};
