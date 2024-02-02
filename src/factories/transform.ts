import { Validated } from "../models/validation/Validated.model";
import { Validator } from "../models/validation/Validator.model";
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
