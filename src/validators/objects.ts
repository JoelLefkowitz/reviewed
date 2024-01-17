import { Validator } from "../models/validation/Validator.model";
import { invalidate, validateIf } from "../factories/validate";
import { isArray } from "./arrays";
import { isObject } from "./primitives";

/**
 * Validate a record
 *
 * @category Validators
 *
 * @typeParam T - the validated type
 * @param input - the raw input
 *
 * @example
 * ```ts
 * isRecord({}) -> { valid: true,  parsed: {}, ... }
 * isRecord([]) -> { valid: false, error: "Not a record: []", ... }
 * ```
 */
export const isRecord: Validator<Record<string | number | symbol, unknown>> = (
  input: unknown,
) =>
  validateIf(
    isObject(input).valid && !isArray(input).valid,
    "Not a record",
    input,
  );

/**
 * Validate a non empty record
 *
 * @category Validators
 *
 * @typeParam T - the validated type
 * @param input - the raw input
 *
 * @example
 * ```ts
 * isRecord({a: 1}) -> { valid: true,  parsed: {a: 1}, ... }
 * isRecord({})     -> { valid: false, error: "Not a non empty record: {}", ... }
 * ```
 */
export const isNonEmptyRecord: Validator<
  Record<string | number | symbol, unknown>
> = (input: unknown) => invalidate(input, "Not a non empty record");
