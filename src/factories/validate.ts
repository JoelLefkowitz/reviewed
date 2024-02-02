import { RegexValidator } from "../models/regexes/RegexValidator.model";
import { Validated } from "../models/validation/Validated.model";
import { ValidatedFields } from "../models/fields/ValidatedFields.model";
import { Validator } from "../models/validation/Validator.model";
import { ValidatorFields } from "../models/fields/ValidatorFields.model";
import { allValid, merge } from "../results/merge";
import { guard } from "./guards";
import { invalidateWith } from "./invalidate";
import { isArray } from "../validators/arrays";
import { isRecord } from "../validators/records";
import { isString } from "../validators/primitives";

/**
 * Validate an input
 *
 * @category Factories
 *
 * @typeParam T - the validated type
 * @typeParam U - the validation errors type
 * @param input - the raw input
 * @param parsed - the parsed input
 *
 * @example
 * ```ts
 * validate(1)      -> { valid: true, input: 1,   parsed: 1, error: null };
 * validate("1", 1) -> { valid: true, input: "1", parsed: 1, error: null };
 * ```
 */
export const validate = <T, U>(
  input: unknown,
  parsed: unknown = input,
): Validated<T, U> => ({
  valid: true,
  input,
  parsed: parsed as T,
  error: null,
});

/**
 * Validate an input given a condition
 *
 * @category Factories
 *
 * @typeParam T - the validated type
 * @param condition - the validation condition
 * @param input - the raw input
 * @param parsed - the parsed input
 * @param reason - the failure explanation
 *
 * @example
 * ```ts
 * validateIf(true, "1", 1, "Not a number") ->
 *   { valid: true, input: "1", parsed: 1, error: null };
 * ```
 */
export const validateIf = <T>(
  condition: boolean,
  input: unknown,
  parsed: unknown,
  reason: string,
): Validated<T, string> =>
  condition ? validate(input, parsed) : invalidateWith(input, reason);

/**
 * Validate an array of inputs
 *
 * @category Factories
 *
 * @typeParam T - the validated type
 * @param validator - the validator to use
 * @param input - the raw input
 *
 * @example
 * ```ts
 * validateEach(isNumber, [1, 2, 3]) -> { valid: true, parsed: [1, 2, 3], ... };
 *
 * validateEach(isNumber, ["1", 2, "3"]) -> {
 *     valid: false,
 *     error: '[Not a number: "1", Not a number: "3"]: ["1",2,"3"]',
 *     ...
 *   };
 * ```
 */
export const validateEach = <T>(
  validator: Validator<T>,
  input: unknown,
): Validated<T[]> => {
  const array = isArray(input);

  if (!array.valid) {
    return array;
  }

  return allValid(array.parsed.map(validator));
};

/**
 * Validate an input's fields with validators
 *
 * @category Factories
 *
 * @typeParam T - the validated type
 * @param validators - the validators to use
 * @param input - the raw input
 *
 * @example
 * ```ts
 * validateWith({ a: isString }, { a: "1" }) ->
 *   { valid: true, parsed: { a: "1" }, ... };
 *
 * validateWith({ a: isString }, { a: 1 }) ->
 *   { valid: false, error: { a: "Not a string: 1" }, ... };
 * ```
 */
export const validateWith = <T>(
  validators: ValidatorFields<T>,
  input: unknown,
): Validated<T> => {
  const record = isRecord(input);

  if (!record.valid) {
    return record;
  }

  const validated = Object.fromEntries(
    Object.entries(validators).map(([field, validator]) => [
      field,
      (validator as Validator<unknown>)(record.parsed[field]),
    ]),
  );

  return merge(validated as ValidatedFields<T>);
};

/**
 * Validate an input given a regex
 *
 * @category Factories
 *
 * @typeParam T - the validated type
 * @param regex - the regex
 * @param reason - the failure explanation
 *
 * @example
 * ```ts
 * validateRegex(
 *   /^(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})$/u,
 *   "Not a yyyy-mm-dd date"
 * ) -> {
 *     valid: true,
 *     input: "1234-12-12",
 *     parsed: {
 *       match: "1234-12-12",
 *       index: 0,
 *       captured: ["1234", "12", "12"],
 *       named: { year: "1234", month: "12", day: "12" },
 *     },
 *     error: null,
 *   };
 * ```
 */
export const validateRegex =
  <T extends string>(regex: RegExp, reason: string): RegexValidator<T> =>
  (input: unknown) => {
    if (guard(isString)(input)) {
      const parsed = regex.exec(input);

      if (parsed !== null) {
        const [match, ...captured] = parsed;
        const { index, groups } = parsed;

        return validate(input, {
          match,
          index,
          captured,
          named: { ...groups },
        });
      }
    }

    return invalidateWith(input, reason);
  };
