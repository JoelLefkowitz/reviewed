import { Validator } from "../models/validators";
import { isArray } from "./arrays";
import { isObject } from "./primitives";
import { validateIf } from "../factories/conditionals";

/**
 * Validate a record
 *
 * @category Validators
 * @example
 *   isRecord({}) >>
 *     {
 *       valid: true,
 *       parsed: {},
 *     };
 *
 *   isRecord([]) >>
 *     {
 *       valid: false,
 *       error: "Not a record: []",
 *     };
 *
 * @typeParam T - The validated type
 * @param input - The raw input
 */
export const isRecord: Validator<Record<string, unknown>> = (input: unknown) =>
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
 * @example
 *   isRecord({ a: 1 }) >>
 *     {
 *       valid: true,
 *       parsed: { a: 1 },
 *     };
 *
 *   isRecord({}) >>
 *     {
 *       valid: false,
 *       error: "Not a non empty record: {}",
 *     };
 *
 * @typeParam T - The validated type
 * @param input - The raw input
 */
export const isNonEmptyRecord: Validator<Record<string, unknown>> = (
  input: unknown,
) => {
  const record = isRecord(input);

  if (!record.valid) {
    return record;
  }

  return validateIf(
    Object.keys(record.parsed).length > 0,
    input,
    input,
    "Not a non empty record",
  );
};
