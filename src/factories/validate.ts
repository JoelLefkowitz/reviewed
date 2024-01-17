import { RegexValidator } from "../models/regexes/RegexValidator.model";
import { Validated } from "../models/validation/Validated.model";
import { guard } from "./guards";
import { isString } from "../validators/primitives";

/**
 * Validate an input
 *
 * @category Factories
 *
 * @typeParam T - the validated type
 * @param input - the raw input
 * @param parsed - the parsed input
 *
 * @example
 * ```ts
 * validate(1)      -> { valid: true, input: 1,   parsed: 1, error: null }
 * validate("1", 1) -> { valid: true, input: "1", parsed: 1, error: null }
 * ```
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
 * Invalidate an input
 *
 * @category Factories
 *
 * @typeParam T - the validated type
 * @param input - the raw input
 * @param reason - the failure explanation
 *
 * @example
 * ```ts
 * invalidate("", "Not a number") ->
 *   { valid: false, input: "", parsed: null, error: 'Not a number: ""' }
 * ```
 */
export const invalidate = <T>(
  input: unknown,
  reason: string,
): Validated<T> => ({
  valid: false,
  input,
  parsed: null,
  error: reason.concat(
    ": ",
    JSON.stringify(input, (_, token: unknown) =>
      typeof token === "number" &&
      (isNaN(token) || [Infinity, -Infinity].includes(token))
        ? token.toString()
        : token,
    ),
  ),
});

/**
 * Validate an input given a condition
 *
 * @category Factories
 *
 * @typeParam T - the validated type
 * @param condition - the validation condition
 * @param reason - the failure explanation
 * @param input - the raw input
 * @param parsed - the parsed input
 *
 * @example
 * ```ts
 * validateIf(true, "Not a number", "1", 1) ->
 *   { valid: true, input: "1", parsed: 1, error: null }
 * ```
 */
export const validateIf = <T>(
  condition: boolean,
  reason: string,
  input: unknown,
  parsed: unknown = input,
): Validated<T> =>
  condition ? validate(input, parsed) : invalidate(input, reason);

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

    return invalidate(input, reason);
  };
