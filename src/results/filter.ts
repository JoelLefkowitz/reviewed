import { Validated } from "../models/validation/Validated.model";
import { reduceRecord } from "../services/records";

/**
 * ...
 *
 * @category Results
 *
 * @typeParam ...
 * @param ...
 *
 * @example
 * ```ts
 * ...
 * ```
 */
export const validatedOr = <T>(result: Validated<T>, fallback: T): T =>
  result.valid ? result.parsed : fallback;

/**
 * ...
 *
 * @category Results
 *
 * @typeParam ...
 * @param ...
 *
 * @example
 * ```ts
 * ...
 * ```
 */
export const filterValidated = <T>(results: Validated<T>[]): T[] =>
  results.reduce<T[]>(
    (acc, { valid, parsed }) => (valid ? [...acc, parsed] : acc),
    [] as T[],
  );

/**
 * ...
 *
 * @category Results
 *
 * @typeParam ...
 * @param ...
 *
 * @example
 * ```ts
 * ...
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
 * ...
 *
 * @category Results
 *
 * @typeParam ...
 * @param ...
 *
 * @example
 * ```ts
 * ...
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
