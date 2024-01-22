import { Validator } from "../models/validation/Validator.model";
import { isArray } from "./arrays";
import { isObject } from "./primitives";
import { validateIf } from "../factories/validate";

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
    input,
    input,
    "Not a record",
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
> = (input: unknown) => {
  const isRecordCheck = isRecord(input);

  if (!isRecordCheck.valid) {
    return isRecordCheck;
  }

  return validateIf(
    Object.keys(isRecordCheck.parsed).length > 0,
    input,
    input,
    "Not a non empty record",
  );
};
