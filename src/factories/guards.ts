import { Guard, Validator } from "../models/validators";
import { invalidateWith } from "./invalidate";
import { validate } from "./validate";

/**
 * Validate and cast an input
 *
 * @category Factories
 * @example
 *   if (guard(isNumber, input)) {
 *     // input is treated as a number in this block
 *   }
 *
 * @typeParam T - The validated type
 * @param validator - The validator to convert
 */
export const guard = <T>(validator: Validator<T>, input: unknown): input is T =>
  validator(input).valid;

/**
 * Augment a validator to cast an input
 *
 * @category Factories
 * @example
 *   if (guards(isNumber)(input)) {
 *     // input is treated as a number in this block
 *   }
 *
 * @typeParam T - The validated type
 * @param validator - The validator to convert
 */
export const guards =
  <T>(validator: Validator<T>) =>
  (input: unknown): input is T =>
    guard(validator, input);

/**
 * Construct a validator from a guard
 *
 * @category Factories
 * @example
 *   const guard = (input): input is number =>
 *     typeof input === "number" && !isNaN(input);
 *
 *   const isNumber = fromGuard(guard, "Not a number");
 *
 *   isNumber(1) >>
 *     {
 *       valid: true,
 *       parsed: 1,
 *     };
 *
 * @typeParam T - The validated type
 * @param guard  - The guard to convert
 * @param reason - The failure explanation if invalid
 */
export const fromGuard =
  <T>(guard: Guard<T>, reason: string): Validator<T> =>
  (input: unknown) =>
    guard(input) ? validate(input) : invalidateWith<T>(reason)(input);
