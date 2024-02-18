import { Invalid, Validated, Validator } from "../models/validators";
import { all } from "./results";
import { isArray } from "../validators/arrays";

/**
 * Validate an array of inputs individually
 *
 * @category Factories
 * @example
 *   validateEach(isNumber)([1, "2"]) >>
 *     [
 *       {
 *         valid: true,
 *         parsed: 1,
 *       },
 *       {
 *         valid: false,
 *         error: 'Not a number: "2"',
 *       },
 *     ];
 *
 * @typeParam T - The validated type
 * @param validator - The validator to use
 * @param input     - The raw input
 */
export const validateEach =
  <T>(validator: Validator<T>) =>
  (input: unknown): Validated<T>[] => {
    const array = isArray(input);

    if (!array.valid) {
      return [array as Invalid<T>];
    }

    return array.parsed.map(validator);
  };

/**
 * Validate an input's fields with validators
 *
 * @category Factories
 * @example
 *   validateAll(isNumber)([1, 2, 3]) >>
 *     {
 *       valid: true,
 *       parsed: [1, 2, 3],
 *     };
 *
 *   validateAll(isNumber)(["1", 2, "3"]) >>
 *     {
 *       valid: false,
 *       error: ['Not a number: "1"', 'Not a number: "3"'],
 *     };
 *
 * @typeParam T - The validated type
 * @param validators - The validators to use
 */
export const validateAll =
  <T>(validator: Validator<T>): Validator<T[]> =>
  (input: unknown) => {
    const array = isArray(input);

    if (!array.valid) {
      return array;
    }

    return all(array.parsed.map(validator));
  };
