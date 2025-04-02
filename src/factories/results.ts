import { Validated, ValidationErrors } from "../models/validators";
import { ValidatedFields } from "../models/fields";
import { all as allPasses } from "passes";
import { group } from "../internal/arrays";
import { invalidate, invalidateWith } from "./invalidate";
import { mapRecord, pickField, reduceRecord } from "../internal/records";
import { validate } from "./validate";

/**
 * Merge an array of validated results using a logical AND
 *
 * @category Factories
 * @example
 *   all(["1", 2, "3"].map(isNumber)) >>
 *     {
 *       valid: false,
 *       error: ['Not a number: "1"', 'Not a number: "3"'],
 *     };
 *
 * @typeParam T - The validated type
 * @param results - The validated results to merge
 */
export const all = <T>(results: Validated<T>[]): Validated<T[]> => {
  if (results.length === 0) {
    return validate([]);
  }

  const { input, parsed, error } = group(results);

  return error.every((i) => i === null)
    ? validate(input, parsed)
    : invalidate(
        input,
        error.filter((i) => i !== null) as ValidationErrors<T[]>,
      );
};

/**
 * Merge an array of validated results using a logical OR
 *
 * @category Factories
 * @example
 *   any(["1", 2, "3"].map(isNumber)) >>
 *     {
 *       valid: true,
 *       parsed: [2],
 *     };
 *
 * @typeParam T - The validated type
 * @param results - The validated results to merge
 */
export const any = <T>(results: Validated<T>[]): Validated<T[]> => {
  if (results.length === 0) {
    return invalidateWith<T[]>("Not a non empty array")(results);
  }

  const { input, error } = group(results);

  const parsed = results.reduce<T[]>(
    (acc, { valid, parsed }) => (valid ? acc.concat(parsed) : acc),
    [],
  );

  return error.some((i) => i === null)
    ? validate(input, parsed)
    : invalidate(
        input,
        error.filter((i) => i !== null) as ValidationErrors<T[]>,
      );
};

/**
 * Merge the validated fields of an object
 *
 * @category Factories
 * @example
 *   merge({ a: isNumber("1"), b: isNumber(2), c: isNumber("3") }) >>
 *     {
 *       valid: false,
 *       error: {
 *         a: 'Not a number: "1"',
 *         c: 'Not a number: "3"',
 *       },
 *     };
 *
 * @typeParam T - The validated type
 * @param results - The validated results to merge
 */
export const merge = <T>(results: ValidatedFields<T>): Validated<T> => {
  const valid = pickField("valid", results);
  const input = pickField("input", results);

  if (allPasses(Object.values(valid))) {
    const parsed = mapRecord(({ parsed }) => parsed, results);
    return validate(input, parsed);
  }

  const errors = reduceRecord(
    ({ error }) => error,
    ({ valid }) => !valid,
    results,
  );

  return invalidate(input, errors as ValidationErrors<T>);
};

/**
 * Select parsed results from validated fields
 *
 * @category Factories
 * @example
 *   sieve({ a: isNumber("1"), b: isNumber(2), c: isNumber("3") }) >>
 *     { b: 2 };
 *
 * @typeParam T - The validated type
 * @param results - The validated results to filter
 */
export const sieve = <A>(results: ValidatedFields<A>): Partial<A> =>
  reduceRecord(
    ({ parsed }) => parsed,
    ({ valid }) => valid,
    results,
  ) as Partial<A>;
