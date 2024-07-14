import { Validated, Validator } from "../models/validators";
import { invalidateWith } from "./invalidate";
import { isUndefined } from "../validators/primitives";
import { validate } from "./validate";

/**
 * Invert a validator
 *
 * @category Factories
 * @example
 *   const isNotNull = not(isNull, "Is null");
 *
 *   isNotNull(null).error >>
 *     {
 *       valid: false,
 *       error: "Is null: null",
 *     };
 *
 * @typeParam T - The validated type
 * @param validator - The validator to invert
 * @param reason    - The failure explanation
 */
export const not =
  <T>(validator: Validator<T>, reason?: string): Validator<unknown> =>
  (input: unknown) => {
    const { valid } = validator(input);
    return !valid
      ? validate(input)
      : invalidateWith(reason ?? "Not Invalid")(input);
  };

/**
 * Combine two validators with a logical AND
 *
 * @category Factories
 * @example
 *   const isNonEmptyStringArray = both(isNonEmptyArray, isStringArray);
 *
 *   isNonEmptyStringArray([""]) >>
 *     {
 *       valid: true,
 *       parsed: [""],
 *     };
 *
 *   isNonEmptyStringArray([]) >>
 *     {
 *       valid: false,
 *       error: "Not a non empty array: []",
 *     };
 *
 *   isNonEmptyStringArray([1]) >>
 *     {
 *       valid: false,
 *       error: "Not an array of strings: [1]",
 *     };
 *
 * @typeParam T - The first validated type
 * @typeParam U - The second validated type
 * @param first  - The first validator
 * @param second - The second validator
 */
export const both =
  <T, U>(first: Validator<T>, second: Validator<U>): Validator<T & U> =>
  (input: unknown) => {
    const left = first(input) as Validated<T & U>;
    const right = second(input) as Validated<T & U>;

    if (left.valid && right.valid) {
      return left;
    }

    return left.valid ? right : left;
  };

/**
 * Combine two validators with a logical OR
 *
 * @category Factories
 * @example
 *   const isStringOrNull = either(isString, isNull);
 *
 *   isStringOrNull("") >>
 *     {
 *       valid: true,
 *       parsed: "",
 *     };
 *
 *   isStringOrNull(null) >>
 *     {
 *       valid: true,
 *       parsed: null,
 *     };
 *
 *   isStringOrNull(1) >>
 *     {
 *       valid: false,
 *       error: "Not a string: 1",
 *     };
 *
 * @typeParam T - The first validated type
 * @typeParam U - The second validated type
 * @param first  - The first validator
 * @param second - The second validator
 */
export const either =
  <T, U>(first: Validator<T>, second: Validator<U>): Validator<T | U> =>
  (input: unknown) => {
    const left = first(input) as Validated<T | U>;

    if (left.valid) {
      return left;
    }

    const right = second(input) as Validated<T | U>;

    return right.valid ? right : left;
  };

/**
 * Allow a validator to accept undefined inputs
 *
 * @category Factories
 * @example
 *   interface Person {
 *     name?: string;
 *   }
 *
 *   const isPerson = isRecordOf<Person>({ name: optional(isString) });
 *
 *   isPerson({}) >>
 *     {
 *       valid: true,
 *       parsed: { name: undefined },
 *     };
 *
 *   isPerson({ name: "Joel" }) >>
 *     {
 *       valid: true,
 *       parsed: { name: "Joel" },
 *     };
 *
 * @typeParam T - The validated type
 * @param first - The validator
 */
export const optional = <T>(
  validator: Validator<T>,
): Validator<T | undefined> => either(validator, isUndefined);
