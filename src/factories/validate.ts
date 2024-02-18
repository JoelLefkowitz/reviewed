import { Validated, Validator } from "../models/validators";
import { ValidatedFields, ValidatorFields } from "../models/fields";
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

    const validated = Object.fromEntries(
      Object.entries(validators).map(([field, validator]) => [
        field,
        (validator as Validator<unknown>)(record.parsed[field]),
      ]),
    );

    return merge(validated as ValidatedFields<T>);
  };
