import { Validator } from "../models/validators";
import { isNumber } from "./primitives";
import { validateIf } from "../factories/conditionals";

/**
 * Validate an integer
 *
 * @category Validators
 * @example
 *   isInteger(1) >>
 *     {
 *       valid: true,
 *       parsed: 1,
 *     };
 *
 *   isInteger(0.5) >>
 *     {
 *       valid: false,
 *       error: "Not an integer: 0.5",
 *     };
 *
 * @typeParam T - The validated type
 * @param input - The raw input
 */
export const isInteger: Validator<number> = (input: unknown) => {
  const number = isNumber(input);

  if (!number.valid) {
    return number;
  }

  return validateIf(
    Number.isInteger(number.parsed),
    input,
    input,
    "Not an integer",
  );
};

/**
 * Validate a natural number
 *
 * @category Validators
 * @example
 *   isNaturalNumber(1) >>
 *     {
 *       valid: true,
 *       parsed: 1,
 *     };
 *
 *   isNaturalNumber(0) >>
 *     {
 *       valid: false,
 *       error: "Not a natural number: 0",
 *     };
 *
 * @typeParam T - The validated type
 * @param input - The raw input
 */
export const isNaturalNumber: Validator<number> = (input: unknown) => {
  const integer = isInteger(input);

  if (!integer.valid) {
    return integer;
  }

  return validateIf(integer.parsed > 0, input, input, "Not a natural number");
};
