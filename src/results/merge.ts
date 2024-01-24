import { Validated } from "../models/validation/Validated.model";
import { ValidatedFields } from "../models/fields/ValidatedFields.model";
import { ValidationErrors } from "../models/validation/ValidationErrors.model";
import { all, group } from "../services/arrays";
import { guard } from "../factories/guards";
import { invalidate, validate } from "../factories/validate";
import { isString } from "../validators/primitives";
import { mapRecord, pickField, reduceRecord } from "../services/records";

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
 *   }
 * ```
 */
export const merge = <T>(
  results: ValidatedFields<T>,
): Validated<T, ValidationErrors<T>> => {
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
 * Merge an array of validated results
 *
 * @category Results
 *
 * @typeParam T - the validated type
 * @param results - the validated results to merge
 *
 * @example
 * ```ts
 * mergeArray(["1", 2, "3"].map(isNumber)) -> {
 *     valid: false,
 *     error: ['Not a number: "1"', 'Not a number: "3"'],
 *     ...
 *   }
 * ```
 */
export const mergeArray = <T>(
  results: Validated<T, string>[],
): Validated<T[], string[]> => {
  const { valid, input, parsed, error } = group(results);

  if (all(valid)) {
    return validate(input, parsed);
  }

  const errors = error.filter(guard(isString));
  return invalidate(input, errors);
};
