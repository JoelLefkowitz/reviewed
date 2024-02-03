import { Validated } from "../models/validation/Validated.model";
import { Validator } from "../models/validation/Validator.model";
import { anyValid } from "../results/merge";
import { validateIf } from "./validate";

/**
 * Invert a validator
 *
 * @category Factories
 *
 * @typeParam T - the validated type
 * @param validator - the validator to invert
 * @param reason - the failure explanation
 *
 * @example
 * ```ts
 * const isNotNull = not(isNull, "Not (not null)");
 *
 * isNotNull(null).error ->
 *   { valid: false, error: "Not (not null): null", ... };
 * ```
 */
export const not =
  <T>(validator: Validator<T>, reason: string): Validator<unknown> =>
  (input: unknown): Validated<unknown> =>
    validateIf(!validator(input).valid, input, input, reason);

/**
 * Combine two validators with a logical OR
 *
 * @category Factories
 *
 * @typeParam T - the first validated type
 * @typeParam U - the second validated type
 * @param left - the first validator
 * @param right - the second validator
 *
 * @example
 * ```ts
 * const isStringOrNull = either(isString, isNull);
 *
 * isStringOrNull("") -> { valid: true, parsed: "", ... };
 *
 * isStringOrNull(1) ->
 *   { valid: false, error: ["Not a string: 1", "Not null: 1"], ... };
 * ```
 */
export const either =
  <T, U>(left: Validator<T>, right: Validator<U>): Validator<T | U> =>
  (input: unknown): Validated<T | U> =>
    anyValid([left(input), right(input)] as Validated<T | U>[]);
