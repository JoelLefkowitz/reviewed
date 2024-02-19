import { Validated, Validator } from "../models/validators";
import { guard } from "../factories/guards";
import { isNumber, isString } from "./primitives";
import { serialize } from "../services/strings";
import { validateIf } from "../factories/conditionals";

/**
 * Validate an array
 *
 * @category Validators
 * @example
 *   isArray([]) >>
 *     {
 *       valid: true,
 *       parsed: [],
 *     };
 *
 *   isArray([1]) >>
 *     {
 *       valid: true,
 *       parsed: [1],
 *     };
 *
 *   isArray("") >>
 *     {
 *       valid: false,
 *       error: 'Not an array: ""',
 *     };
 *
 * @typeParam T - The validated type
 * @param input - The raw input
 */
export const isArray: Validator<unknown[]> = (input: unknown) =>
  validateIf(Array.isArray(input), input, input, "Not an array");

/**
 * Validate a non empty array
 *
 * @category Validators
 * @example
 *   isNonEmptyArray([1]) >>
 *     {
 *       valid: true,
 *       parsed: [1],
 *     };
 *
 *   isNonEmptyArray("") >>
 *     {
 *       valid: false,
 *       error: 'Not an array: ""',
 *     };
 *
 *   isNonEmptyArray([]) >>
 *     {
 *       valid: false,
 *       error: "Not a non empty array: []",
 *     };
 *
 * @typeParam T - The validated type
 * @param input - The raw input
 */
export const isNonEmptyArray: Validator<unknown[]> = (input: unknown) => {
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
 * @example
 *   isNumberArray([]) >>
 *     {
 *       valid: true,
 *       parsed: [],
 *     };
 *
 *   isNumberArray([1]) >>
 *     {
 *       valid: true,
 *       parsed: [1],
 *     };
 *
 *   isNumberArray("") >>
 *     {
 *       valid: false,
 *       error: 'Not an array: ""',
 *     };
 *
 *   isNumberArray([""]) >>
 *     {
 *       valid: false,
 *       error: 'Not an array of numbers: [""]',
 *     };
 *
 * @typeParam T - The validated type
 * @param input - The raw input
 */
export const isNumberArray: Validator<number[]> = (input: unknown) => {
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
 * @example
 *   isStringArray([]) >>
 *     {
 *       valid: true,
 *       parsed: [],
 *     };
 *
 *   isStringArray([""]) >>
 *     {
 *       valid: true,
 *       parsed: [""],
 *     };
 *
 *   isStringArray("") >>
 *     {
 *       valid: false,
 *       error: 'Not an array: ""',
 *     };
 *
 *   isStringArray([1]) >>
 *     {
 *       valid: false,
 *       error: "Not an array of strings: [1]",
 *     };
 *
 * @typeParam T - The validated type
 * @param input - The raw input
 */
export const isStringArray: Validator<string[]> = (input: unknown) => {
  const array = isArray(input);

  if (!array.valid) {
    return array;
  }

  return validateIf(
    array.parsed.every(guard(isString)),
    input,
    input,
    "Not an array of strings",
  );
};

/**
 * Validate an input is one of a list of options
 *
 * @category Validators
 * @example
 *   isOneOf([1, 2, 3])(1) >>
 *     {
 *       valid: true,
 *       parsed: 1,
 *     };
 *
 *   isOneOf([1, 2, 3])(4) >>
 *     {
 *       valid: false,
 *       error: "Not one of [1, 2, 3]: 4",
 *     };
 *
 * @typeParam T - The validated type
 * @param options - The valid options
 */
export const isOneOf =
  <T>(options: readonly T[]): Validator<T> =>
  (input: unknown) =>
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
 * @example
 *   isManyOf([1, 2, 3])([3, 1]) >>
 *     {
 *       valid: true,
 *       parsed: [3, 1],
 *     };
 *
 *   isManyOf([1, 2, 3])([3, 1, 4]) >>
 *     {
 *       valid: false,
 *       error: "Not an array of [1, 2, 3]: [3, 1, 4]",
 *     };
 *
 * @typeParam T - The validated type
 * @param options - The valid options
 */
export const isManyOf =
  <T>(options: readonly T[]) =>
  (input: unknown): Validated<T[]> => {
    const array = isArray(input);

    if (!array.valid) {
      return array as Validated<T[]>;
    }

    return validateIf(
      !array.parsed.some((i) => !options.includes(i as T)),
      input,
      input,
      `Not an array of ${serialize(options)}`,
    );
  };
