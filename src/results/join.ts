import {
  Errors,
  Validated,
  ValidatedInline,
} from "../models/validation/Validated.model";
import { all, group } from "../services/arrays";
import { guard } from "../factories/guards";
import { invalidate, validate } from "../factories/validate";
import { isString } from "../validators/primitives";
import { mapRecord, pickField, reduceRecord } from "../services/records";

export const merge = <T>(
  results: ValidatedInline<T>
): Validated<T, Errors<T>> => {
  const valid = pickField("valid", results);
  const input = pickField("input", results);

  if (all(Object.values(valid))) {
    const parsed = mapRecord(({ parsed }) => parsed, results);
    return validate(input, parsed);
  }

  const errors = reduceRecord(
    ({ error }) => error,
    ({ error }) => isString(error).valid,
    results
  );

  return invalidate(input, errors as Errors<T>);
};

export const mergeArray = <T>(
  results: Validated<T>[]
): Validated<T[], string[]> => {
  const { valid, input, parsed, error } = group(results);

  if (all(valid)) {
    return validate(input, parsed);
  }

  const errors = error.filter(guard(isString));
  return invalidate(input, errors);
};
