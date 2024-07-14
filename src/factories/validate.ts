import { Validated, Validator } from "../models/validators";
import { ValidatedFields, ValidatorFields } from "../models/fields";
import { invalidate } from "./invalidate";
import { isRecord } from "../validators/records";
import { merge } from "./results";

/**
 * Validate an input
 *
 * @category Factories
 * @example
 *   validate(1) >>
 *     {
 *       valid: true,
 *       input: 1,
 *       parsed: 1,
 *       error: null,
 *     };
 *
 *   validate("1", 1) >>
 *     {
 *       valid: true,
 *       input: "1",
 *       parsed: 1,
 *       error: null,
 *     };
 *
 * @typeParam T - The validated type
 * @param input  - The raw input
 * @param parsed - The parsed input
 */
export const validate = <T>(
  input: unknown,
  parsed: unknown = input,
): Validated<T> => ({
  valid: true,
  input,
  parsed: parsed as T,
  error: null,
});

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

    const validated = Object.entries(record.parsed).map(([name, field]) => [
      name,
      validators[name as keyof T](field),
    ]);

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

    const validated = Object.entries(record.parsed).map(([name, field]) => [
      name,
      (name in validators ? validators[name as keyof T] : validate)(field),
    ]);

    return merge(Object.fromEntries(validated) as ValidatedFields<T>);
  };
