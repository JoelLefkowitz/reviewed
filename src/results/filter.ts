import { Validated } from "../models/validation/Validated.model";
import { Validator } from "../models/validation/Validator.model";
import { guard } from "../factories/guards";
import { isArray } from "../validators/arrays";

/**
 * Select the valid results from an array
 *
 * @category Results
 *
 * @typeParam T - the validated type
 * @param results - the results to filter
 *
 * @example
 * ```ts
 * validated(["1", 2, "3"].map(isNumber)) -> [2]
 * ```
 */
export const validated = <T>(results: Validated<T>[]): T[] =>
  results.reduce<T[]>(
    (acc, { valid, parsed }) => (valid ? acc.concat(parsed) : acc),
    [],
  );

/**
 * Select the valid results from an array of inputs
 *
 * @category Results
 *
 * @typeParam T - the validated type
 * @param validator - the validator to use
 * @param input - the raw inputs
 *
 * @example
 * ```ts
 * validatedWith(isNumber, ["1", 2, "3"]) -> [2]
 * ```
 */
export const validatedWith = <T>(
  validator: Validator<T>,
  input: unknown,
): T[] => (guard(isArray)(input) ? validated(input.map(validator)) : []);

/**
 * Select the errors from an array of results
 *
 * @category Results
 *
 * @typeParam T - the validated type
 * @param results - the results to filter
 *
 * @example
 * ```ts
 * errors(["1", 2, "3"].map(isNumber) ->
 *   ['Not a number: "1"', 'Not a number: "3"']
 * ```
 */
export const errors = (results: Validated<unknown>[]): string[] =>
  results.reduce<string[]>(
    (acc, x) => (x.valid ? acc : acc.concat(x.error)),
    [],
  );
