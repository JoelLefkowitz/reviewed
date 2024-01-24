import { Validated } from "../models/validation/Validated.model";
import { reduceRecord } from "../services/records";

/**
 * Validate and return an input or a fallback
 *
 * @category Results
 *
 * @typeParam T - the validated type
 * @param result - the validated result
 * @param fallback - the fallback
 *
 * @example
 * ```ts
 * validatedOr(isNumber(1), 0))   -> 1
 * validatedOr(isNumber("1"), 0)) -> 0
 * ```
 */
export const validatedOr = <T>(result: Validated<T>, fallback: T): T =>
  result.valid ? result.parsed : fallback;

/**
 * Filter an array of validated results
 *
 * @category Results
 *
 * @typeParam T - the validated type
 * @param results - the validated results to filter
 *
 * @example
 * ```ts
 * filterValidated(["1", 2, "3"].map(isNumber)) -> [2]
 * ```
 */
export const filterValidated = <T>(results: Validated<T>[]): T[] =>
  results.reduce<T[]>(
    (acc, { valid, parsed }) => (valid ? [...acc, parsed] : acc),
    [] as T[],
  );

/**
 * Filter parsed results with a fallback from an array of validated results
 *
 * @category Results
 *
 * @typeParam T - the validated type
 * @param results - the validated results to filter
 * @param fallback - the fallback
 *
 * @example
 * ```ts
 * filterValidatedOr(["1", 2, "3"].map(isNumber), 0) -> [0, 2, 0]
 * ```
 */
export const filterValidatedOr = <T>(
  results: Validated<T>[],
  fallback: T,
): T[] =>
  results.reduce<T[]>(
    (acc, { valid, parsed }) => [...acc, valid ? parsed : fallback],
    [] as T[],
  );

/**
 * Select parsed results from validated fields
 *
 * @category Results
 *
 * @typeParam T - the validated type
 * @param results - the validated results to filter
 *
 * @example
 * ```ts
 * pickValidated({ a: isNumber("1"), b: isNumber(2), c: isNumber("3") })) ->
 *   { b: 2 }
 * ```
 */
export const pickValidated = <T extends string, U>(
  results: Record<T, Validated<U>>,
): Partial<Record<T, U>> =>
  reduceRecord(
    ({ parsed }) => parsed as U,
    ({ valid }) => valid,
    results,
  );
