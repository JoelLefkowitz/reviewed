import { Validated } from "../models/validation/Validated.model";
import { all, group } from "../services/arrays";
import { guard } from "../factories/guards";
import { invalidate, validate } from "../factories/validate";
import { isString } from "../validators/primitives";

export const mergeValidatedArray = <T>(
  results: Validated<T>[],
): Validated<T[], string[]> => {
  const { valid, input, parsed, error } = group(results);
  return all(valid)
    ? validate(input, parsed as T[])
    : invalidate(input, error.filter(guard(isString)));
};

// export const mergeValidatedObject = <T>(
//   results: ValidatedInline<T>,
// ): Validated<T> => {};
