import { Legend, Mapping } from "../models/records";
import { Validated, Validator } from "../models/validators";
import { ValidatedFields, ValidatorFields } from "../models/fields";
import { guard } from "./guards";
import { invalidate } from "./invalidate";
import { isRecord } from "../validators/records";
import { isString } from "../validators/primitives";
import { isUndefined } from "../validators/primitives";
import { merge } from "./results";
import { validate } from "./validate";

/**
 * Validate an input's fields with validators
 *
 * @category Factories
 * @example
 *   validateWith({ a: isNumber, b: isString })({ a: 1, b: "2" }) >>
 *     {
 *       valid: true,
 *       input: { a: 1, b: "2" },
 *     };
 *
 * @typeParam T - The validated type
 * @param validators - The validators to use
 */
export const validateWith =
  <T>(validators: ValidatorFields<T>): Validator<T> =>
  (input: unknown) => {
    const record = isRecord(input);

    if (!record.valid) {
      return record as Validated<T>;
    }

    const missing = Object.keys(validators).filter(
      (i) => !(i in record.parsed || validators[i as keyof T](undefined).valid),
    );

    if (missing.length > 0) {
      return invalidate(
        input,
        `Missing required fields: ${missing.join(", ")}`,
      );
    }

    const extra = Object.keys(record.parsed).filter((i) => !(i in validators));

    if (extra.length > 0) {
      return invalidate(input, `Unexpected extra fields: ${extra.join(", ")}`);
    }

    const validated = Object.entries(record.parsed).reduce<[string, unknown][]>(
      (acc, [k, v]) =>
        guard(isUndefined)(v)
          ? acc
          : [...acc, [k, validators[k as keyof T](v)]],
      [],
    );

    return merge(Object.fromEntries(validated) as ValidatedFields<T>);
  };

/**
 * Validate an input's fields with validators allowing extra fields
 *
 * @category Factories
 * @example
 *   validateWithAtLeast({ a: isNumber, b: isString })({ a: 1, b: "2" }) >>
 *     {
 *       valid: true,
 *       input: { a: 1, b: "2" },
 *     };
 *
 * @typeParam T - The validated type
 * @param validators - The validators to use
 */
export const validateWithAtLeast =
  <T>(validators: ValidatorFields<T>): Validator<T> =>
  (input: unknown) => {
    const record = isRecord(input);

    if (!record.valid) {
      return record as Validated<T>;
    }

    const missing = Object.keys(validators).filter(
      (i) => !(i in record.parsed || validators[i as keyof T](undefined).valid),
    );

    if (missing.length > 0) {
      return invalidate(
        input,
        `Missing required fields: ${missing.join(", ")}`,
      );
    }

    const validated = Object.entries(record.parsed).reduce<[string, unknown][]>(
      (acc, [k, v]) =>
        guard(isUndefined)(v)
          ? acc
          : [
              ...acc,
              [k, (k in validators ? validators[k as keyof T] : validate)(v)],
            ],
      [],
    );

    return merge(Object.fromEntries(validated) as ValidatedFields<T>);
  };

// TODO (Joel): Improve the README.md intro for reviewed showing isRecordOf() and the inferred type
/**
 * Alias for validateWith
 *
 * @category Aliases
 * @see {@link validateWith}
 */
export const isRecordOf = validateWith;

/**
 * Alias for validateWithAtLeast
 *
 * @category Aliases
 * @see {@link validateWithAtLeast}
 */
export const isRecordOfAtLeast = validateWithAtLeast;

// TODO (Joel): Add a docstring here
export const isMapping =
  <T>(validator: Validator<T>): Validator<Mapping<T>> =>
  (input: unknown) => {
    const record = isRecord(input);

    if (!record.valid) {
      return record as Validated<Mapping<T>>;
    }

    const validated = Object.entries(record.parsed).map(([k, v]) => [
      k,
      validator(v),
    ]);

    return merge(Object.fromEntries(validated) as ValidatedFields<Mapping<T>>);
  };

// TODO (Joel): Add a docstring here
export const isLegend: Validator<Legend> = isMapping(isString);
