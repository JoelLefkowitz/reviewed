import { Validated } from "../models/validation/Validated.model";
import { ValidatedFields } from "../models/fields/ValidatedFields.model";
import { ValidationErrors } from "../models/validation/ValidationErrors.model";
import { all, group } from "../services/arrays";
import { guard } from "../factories/guards";
import { invalidate, invalidateWith } from "../factories/invalidate";
import { isString } from "../validators/primitives";
import { mapRecord, pickField, reduceRecord } from "../services/records";
import { validate } from "../factories/validate";

/**
 * Merge the validated fields of an object
 *
 * @category Results
 *
 * @typeParam T - the validated type
 * @param results - the validated results to merge
 *
 * @example
 * ```ts
 * merge({ a: isNumber("1"), b: isNumber(2), c: isNumber("3") }) -> {
 *     valid: false,
 *     error: { a: 'Not a number: "1"', c: 'Not a number: "3"' },
 *     ...
 *   };
 * ```
 */
export const merge = <T>(results: ValidatedFields<T>): Validated<T> => {
  const valid = pickField("valid", results);
  const input = pickField("input", results);

  if (all(Object.values(valid))) {
    const parsed = mapRecord(({ parsed }) => parsed, results);
    return validate(input, parsed);
  }

  const errors = reduceRecord(
    ({ error }) => error,
    ({ error }) => isString(error).valid,
    results,
  );

  return invalidate(input, errors as ValidationErrors<T>);
};

/**
 * Merge an array of validated results using a logical AND
 *
 * @category Results
 *
 * @typeParam T - the validated type
 * @param results - the validated results to merge
 *
 * @example
 * ```ts
 * allValid(["1", 2, "3"].map(isNumber)) -> {
 *     valid: false,
 *     error: ['Not a number: "1"', 'Not a number: "3"'],
 *     ...
 *   };
 * ```
 */
export const allValid = <T>(results: Validated<T>[]): Validated<T[]> => {
  if (results.length === 0) {
    return validate([], []);
  }

  const { valid, input, parsed, error } = group(results);

  if (all(valid)) {
    return validate(input, parsed);
  }

  const errors = (error as string[]).filter(guard(isString));
  return invalidate(input, errors);
};

/**
 * Merge an array of validated results using a logical OR
 *
 * @category Results
 *
 * @typeParam T - the validated type
 * @param results - the validated results to merge
 *
 * @example
 * ```ts
 * anyValid(["1", 2, "3"].map(isNumber)) -> { valid: true, parsed: 2, ... };
 * ```
 */
export const anyValid = <T>(results: Validated<T>[]): Validated<T> => {
  if (results.length === 0) {
    return invalidateWith(results, "Not a non empty array");
  }

  const valid = results.find(({ valid }) => valid);

  if (valid) {
    return valid;
  }

  return invalidate(
    results,
    results.map(({ error }) => error).filter(guard(isString)),
  );
};
