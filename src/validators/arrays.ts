import { Validated } from "../models/validation/Validated.model";
import { Validator } from "../models/validation/Validator.model";
import { isNumber, isString } from "./primitives";
import { serialize } from "../services/strings";
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
export const isArray: Validator<unknown[], string> = (input: unknown) =>
  validateIf(Array.isArray(input), input, input, "Not an array");

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
export const isNonEmptyArray: Validator<unknown[], string> = (
  input: unknown,
) => {
  const array = isArray(input);

  if (!array.valid) {
    return array;
  }

  return validateIf(
    array.parsed.length > 0,
    input,
    input,
    "Not a non empty array",
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
export const isNumberArray: Validator<number[], string> = (input: unknown) => {
  const array = isArray(input);

  if (!array.valid) {
    return array;
  }

  return validateIf(
    array.parsed.every((i) => isNumber(i).valid),
    input,
    input,
    "Not an array of numbers",
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
export const isStringArray: Validator<string[], string> = (input: unknown) => {
  const array = isArray(input);

  if (!array.valid) {
    return array;
  }

  return validateIf(
    array.parsed.every((i) => isString(i).valid),
    input,
    input,
    "Not an array of strings",
  );
};

/**
 * Validate an input is one of a list of options
 *
 * @category Validators
 *
 * @typeParam T - the validated type
 * @param options - the valid options
 * @param input - the raw input
 *
 * @example
 * ```ts
 * isOneOf([1, 2, 3], 1) -> { valid: true, parsed: 1, ... }
 *
 * isOneOf([1, 2, 3], 4) ->
 *   { valid: false, error: "Not one of [1, 2, 3]: 4", ... }
 * ```
 */
export const isOneOf = <T>(
  options: T[],
  input: unknown,
): Validated<T, string> =>
  validateIf(
    options.includes(input as T),
    input,
    input,
    `Not one of ${serialize(options)}`,
  );

/**
 * Validate an input is an array of elements from a list of options
 *
 * @category Validators
 *
 * @typeParam T - the validated type
 * @param options - the valid options
 * @param input - the raw input
 *
 * @example
 * ```ts
 * isArrayOf([1, 2, 3], [3, 1]) -> { valid: true, parsed: [3, 1], ... }
 *
 * isArrayOf([1, 2, 3], [3, 1, 4]) ->
 *   { valid: false, error: "Not an array of [1, 2, 3]: [3, 1, 4]", ... }
 * ```
 */
export const isArrayOf = <T>(
  options: T[],
  input: unknown,
): Validated<T[], string> => {
  const array = isArray(input);

  if (!array.valid) {
    return array;
  }

  return validateIf(
    !array.parsed.some((i) => !options.includes(i as T)),
    input,
    input,
    `Not an array of ${serialize(options)}`,
  );
};

/**
 * Constructs a set of array validators
 *
 * @category Validators
 *
 * @typeParam T - the validated type
 * @param options - the valid options
 *
 * @example
 * ```ts
 * const builds = ["dev", "prod"] as const;
 * const { isOneOf: isBuild } = arrayValidators(builds);
 *
 * isBuild("dev") -> { valid: true, parsed: [3, 1], ... }
 * isBuild("local") -> { valid: false, 'Not one of ["dev", "prod"]: "local"', ... }
 * ```
 */
export const arrayValidators = <T>(
  options: T[] | readonly T[],
): {
  isOneOf: Validator<T>;
  isArrayOf: Validator<T[]>;
} => ({
  isOneOf: (input: unknown) => isOneOf([...options], input),
  isArrayOf: (input: unknown) => isArrayOf([...options], input),
});
