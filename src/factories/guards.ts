import { Validator } from "../models/validation/Validator.model";
import { invalidateWith } from "./invalidate";
import { validate } from "./validate";

/**
 * Turn a validator into a type guard
 *
 * @category Factories
 *
 * @remarks A validator makes a assertions about the input and returns a typed
 * output. In contrast a guard is able to cast the type of the input for the
 * rest of its block.
 *
 * @typeParam T - the validated type
 * @param validator - the validator to convert
 *
 * @example
 * ```ts
 * if (guard(isNumber)(input)) {
 *   // input is treated as a number in this block
 * }
 * ```
 */
export const guard =
  <T>(validator: Validator<T>) =>
  (input: unknown): input is T =>
    validator(input).valid;

/**
 * Turn a type guard into a validator
 *
 * @category Factories
 *
 * @typeParam T - the validated type
 * @param guard - the guard to convert
 * @param reason - the failure explanation if invalid
 *
 * @example
 * ```ts
 * const guard = (input): input is number =>
 *   typeof input === "number" && !isNaN(input);
 *
 * const isNumber = fromGuard(guard, "Not a number");
 *
 * isNumber(1) -> { valid: true, parsed: 1, ... }
 * ```
 */
export const fromGuard =
  <T>(guard: (input: unknown) => input is T, reason: string): Validator<T> =>
  (input: unknown) =>
    guard(input) ? validate(input) : invalidateWith(input, reason);
