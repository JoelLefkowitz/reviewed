import { JSON as IJSON } from "../models/json";
import { Validator } from "../models/validators";
import { invalidateWith } from "../factories/invalidate";
import { isNumber, isString } from "./primitives";
import { validate } from "../factories/validate";
import { validateIf } from "../factories/conditionals";

/**
 * Validate a boolean string
 *
 * @category Validators
 * @example
 *   isBooleanString("true") >>
 *     {
 *       valid: true,
 *       parsed: true,
 *     };
 *
 *   isBooleanString("false") >>
 *     {
 *       valid: true,
 *       parsed: false,
 *     };
 *
 *   isBooleanString(1) >>
 *     {
 *       valid: false,
 *       error: "Not a string: 1",
 *     };
 *
 *   isBooleanString("") >>
 *     {
 *       valid: false,
 *       error: 'Not a boolean: ""',
 *     };
 *
 * @typeParam T - The validated type
 * @param input - The raw input
 */
export const isBooleanString: Validator<boolean> = (input: unknown) => {
  const string = isString(input);

  if (!string.valid) {
    return string;
  }

  return validateIf(
    ["true", "false"].includes(string.parsed),
    input,
    input === "true",
    "Not a boolean string",
  );
};

/**
 * Validate a number string
 *
 * @category Validators
 * @example
 *   isNumberString("1") >>
 *     {
 *       valid: true,
 *       parsed: 1,
 *     };
 *
 *   isNumberString("") >>
 *     {
 *       valid: false,
 *       error: 'Not a number: ""',
 *     };
 *
 *   isNumberString("NaN") >>
 *     {
 *       valid: false,
 *       error: 'Not a number: "NaN"',
 *     };
 *
 *   isNumberString("Infinity") >>
 *     {
 *       valid: false,
 *       error: 'Not a number: "Infinity"',
 *     };
 *
 * @typeParam T - The validated type
 * @param input - The raw input
 */
export const isNumberString: Validator<number> = (input: unknown) => {
  const string = isString(input);

  if (!string.valid) {
    return string;
  }

  const parsed = parseFloat(string.parsed);
  const number = isNumber(isNaN(parsed) ? input : parsed);

  return validateIf(number.valid, input, number.parsed, "Not a number string");
};

/**
 * Validate an integer string
 *
 * @category Validators
 * @example
 *   isIntegerString("1") >>
 *     {
 *       valid: true,
 *       parsed: 1,
 *     };
 *
 *   isIntegerString("") >>
 *     {
 *       valid: false,
 *       error: 'Not a number: ""',
 *     };
 *
 *   isIntegerString("0.5") >>
 *     {
 *       valid: false,
 *       error: 'Not an integer: "0.5"',
 *     };
 *
 * @typeParam T - The validated type
 * @param input - The raw input
 */
export const isIntegerString: Validator<number> = (input: unknown) => {
  const numberString = isNumberString(input);

  if (!numberString.valid) {
    return numberString;
  }

  return validateIf(
    Number.isInteger(numberString.parsed),
    input,
    numberString.parsed,
    "Not an integer string",
  );
};

/**
 * Validate a natural number string
 *
 * @category Validators
 * @example
 *   isNaturalNumberString("1") >>
 *     {
 *       valid: true,
 *       parsed: 1,
 *     };
 *
 *   isNaturalNumberString("") >>
 *     {
 *       valid: false,
 *       error: 'Not a number: ""',
 *     };
 *
 *   isNaturalNumberString("0.5") >>
 *     {
 *       valid: false,
 *       error: 'Not an integer: "0.5"',
 *     };
 *
 *   isNaturalNumberString("0") >>
 *     {
 *       valid: false,
 *       error: 'Not a natural number: "0"',
 *     };
 *
 * @typeParam T - The validated type
 * @param input - The raw input
 */
export const isNaturalNumberString: Validator<number> = (input: unknown) => {
  const integerString = isIntegerString(input);

  if (!integerString.valid) {
    return integerString;
  }

  return validateIf(
    integerString.parsed > 0,
    input,
    integerString.parsed,
    "Not a natural number string",
  );
};

/**
 * Validate a JSON string
 *
 * @category Validators
 * @example
 *   isJSONString('{"a": 1}') >>
 *     {
 *       valid: true,
 *       parsed: { a: 1 },
 *     };
 *
 *   isJSONString("_") >>
 *     {
 *       valid: false,
 *       error: 'Not JSON: "_"',
 *     };
 *
 * @typeParam T - The validated type
 * @param input - The raw input
 */
export const isJSONString: Validator<IJSON> = (input: unknown) => {
  const string = isString(input);

  if (!string.valid) {
    return string;
  }

  try {
    return validate(input, JSON.parse(string.parsed) as JSON);
  } catch {
    return invalidateWith<IJSON>("Not JSON")(input);
  }
};
