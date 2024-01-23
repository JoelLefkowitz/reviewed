import { Validated } from "../models/validation/Validated.model";
import { ValidatedFields } from "../models/fields/ValidatedFields.model";
import { ValidationErrors } from "../models/validation/ValidationErrors.model";
import { all, group } from "../services/arrays";
import { guard } from "../factories/guards";
import { invalidate, validate } from "../factories/validate";
import { isString } from "../validators/primitives";
import { mapRecord, pickField, reduceRecord } from "../services/records";

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
export const mergeArray = <T>(
  results: Validated<T>[],
): Validated<T[], string[]> => {
  const { valid, input, parsed, error } = group(results);

  if (all(valid)) {
    return validate(input, parsed);
  }

  const errors = error.filter(guard(isString));
  return invalidate(input, errors);
};
