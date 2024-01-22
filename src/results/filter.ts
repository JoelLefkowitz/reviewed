import { Validated } from "../models/validation/Validated.model";
import { Validator } from "../models/validation/Validator.model";
import { guard } from "../factories/guards";
import { isArray } from "../validators/arrays";
import { reduceRecord } from "../services/records";

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
    []
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
  input: unknown
): T[] => (guard(isArray)(input) ? validated(input.map(validator)) : []);

export const selectValidated = <T extends string, U>(
  results: Record<T, Validated<U>>
): Partial<Record<T, U>> =>
  reduceRecord(
    ({ parsed }) => parsed as U,
    ({ valid }) => valid,
    results
  );

// TODO
// export const validatedOr     = <T>(results: Validated<T>,  fallback: T): T => {}
// export const pickValidated   = <T>(results: Validated<T[]>): T[] => {}
// export const pickValidatedOr = <T>(results: Validated<T>,  fallback: T): T[] => {}
