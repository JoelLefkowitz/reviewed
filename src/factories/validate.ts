import { RegexValidator } from "../models/regexes/RegexValidator.model";
import { Validated } from "../models/validation/Validated.model";
import { ValidationErrors } from "../models/validation/ValidationErrors.model";
import { Validator } from "../models/validation/Validator.model";
import { guard } from "./guards";
import { isArray } from "../validators/arrays";
import { isString } from "../validators/primitives";
import { mergeArray } from "../results/merge";
import { rejection } from "../services/strings";

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
 * validate(1)      -> { valid: true, input: 1,   parsed: 1, error: null }
 * validate("1", 1) -> { valid: true, input: "1", parsed: 1, error: null }
 * ```
 */
export const validate = <T, U extends ValidationErrors<T> = string>(
  input: unknown,
  parsed: unknown = input,
): Validated<T, U> => ({
  valid: true,
  input,
  parsed: parsed as T,
  error: null,
});

/**
 * Invalidate an input
 *
 * @category Factories
 *
 * @typeParam T - the validated type
 * @typeParam U - the validation errors type
 * @param input - the raw input
 * @param error - the validation errors
 *
 * @example
 * ```ts
 * invalidate("1", "Not a number") ->
 *   { valid: false, input: "", parsed: null, error: 'Not a number'}
 * ```
 */
export const invalidate = <T, U extends ValidationErrors<T> = string>(
  input: unknown,
  error: U,
): Validated<T, U> => ({
  valid: false,
  input,
  parsed: null,
  error,
});

/**
 * Invalidate an input and serialize it with an error message
 *
 * @category Factories
 *
 * @typeParam T - the validated type
 * @param input - the raw input
 * @param reason - the error message
 *
 * @example
 * ```ts
 * invalidateWith("1", "Not a number") ->
 *   { valid: false, input: "", parsed: null, error: 'Not a number: "1"'}
 * ```
 */
export const invalidateWith = <T>(
  input: unknown,
  reason: string,
): Validated<T> => invalidate(input, rejection(input, reason));

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
 *   { valid: true, input: "1", parsed: 1, error: null }
 * ```
 */
export const validateIf = <T>(
  condition: boolean,
  input: unknown,
  parsed: unknown,
  reason: string,
): Validated<T> =>
  condition ? validate(input, parsed) : invalidateWith(input, reason);

/**
 * Validate an array of inputs
 *
 * @category Factories
 *
 * @typeParam T - the validated type
 * @param validator - the validator to use
 * @param input - the raw inputs
 *
 * @example
 * ```ts
 * validateEach(isNumber, [1, 2, 3]) -> { valid: true, parsed: [1, 2, 3], ... }
 *
 * validateEach(isNumber, ["1", 2, "3"]) -> {
 *     valid: false,
 *     error: '[Not a number: "1", Not a number: "3"]: ["1",2,"3"]',
 *     ...
 *   }
 * ```
 */
export const validateEach = <T>(
  validator: Validator<T>,
  input: unknown,
): Validated<T[], string | string[]> => {
  const isArrayCheck = isArray(input);

  if (!isArrayCheck.valid) {
    return isArrayCheck;
  }

  return mergeArray(isArrayCheck.parsed.map(validator));
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
 *   }
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
