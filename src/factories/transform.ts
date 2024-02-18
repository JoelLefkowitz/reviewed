import { Validated, Validator } from "../models/validators";
import { all, any } from "./results";
import { invalidateWith } from "./invalidate";
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
      : invalidateWith<T>(reason ?? "Not Invalid")(input);
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
 *       parsed: [[""], [""]],
 *     };
 *
 *   isNonEmptyStringArray([]) >>
 *     {
 *       valid: false,
 *       error: ["Not a non empty array: []"],
 *     };
 *
 *   isNonEmptyStringArray(1) >>
 *     {
 *       valid: false,
 *       error: ["Not an array: 1", "Not a array: 1"],
 *     };
 *
 * @typeParam T - The first validated type
 * @typeParam U - The second validated type
 * @param first  - The first validator
 * @param second - The second validator
 */
export const both =
  <T, U>(first: Validator<T>, second: Validator<U>): Validator<T & U> =>
  (input: unknown) =>
    all([first(input) as Validated<T & U>, second(input)]) as Validated<T & U>;

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
 *       parsed: [[""], [""]],
 *     };
 *
 *   isStringOrNull(1) >>
 *     {
 *       valid: false,
 *       error: ["Not a string: 1", "Not null: 1"],
 *     };
 *
 * @typeParam T - The first validated type
 * @typeParam U - The second validated type
 * @param first  - The first validator
 * @param second - The second validator
 */
export const either =
  <T, U>(first: Validator<T>, second: Validator<U>): Validator<T | U> =>
  (input: unknown) =>
    any([first(input) as Validated<T | U>, second(input)]) as Validated<T | U>;
