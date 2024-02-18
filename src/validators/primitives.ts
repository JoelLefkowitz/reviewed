import { Validator } from "../models/validators";
import { validateIf } from "../factories/conditionals";

/**
 * Validate an input is undefined
 *
 * @category Validators
 * @example
 *   isUndefined(undefined) >>
 *     {
 *       valid: true,
 *       parsed: undefined,
 *     };
 *
 *   isUndefined(null) >>
 *     {
 *       valid: false,
 *       error: "Not undefined: null",
 *     };
 *
 * @typeParam T - The validated type
 * @param input - The raw input
 */
export const isUndefined: Validator<undefined> = (input: unknown) =>
  validateIf(input === undefined, input, input, "Not undefined");

/**
 * Validate an input is null
 *
 * @category Validators
 * @example
 *   isNull(null) >>
 *     {
 *       valid: true,
 *       parsed: null,
 *     };
 *
 *   isNull(undefined) >>
 *     {
 *       valid: false,
 *       error: "Not null: undefined",
 *     };
 *
 * @typeParam T - The validated type
 * @param input - The raw input
 */
export const isNull: Validator<null> = (input: unknown) =>
  validateIf(input === null, input, input, "Not null");

/**
 * Validate a boolean
 *
 * @category Validators
 * @example
 *   isBoolean(true) >>
 *     {
 *       valid: true,
 *       parsed: true,
 *     };
 *
 *   isBoolean(false) >>
 *     {
 *       valid: true,
 *       parsed: false,
 *     };
 *
 *   isBoolean("") >>
 *     {
 *       valid: false,
 *       error: 'Not a boolean: ""',
 *     };
 *
 * @typeParam T - The validated type
 * @param input - The raw input
 */
export const isBoolean: Validator<boolean> = (input: unknown) =>
  validateIf(typeof input === "boolean", input, input, "Not a boolean");

/**
 * Validate a number
 *
 * @category Validators
 * @example
 *   isNumber(1) >>
 *     {
 *       valid: true,
 *       parsed: 1,
 *     };
 *
 *   isNumber("") >>
 *     {
 *       valid: false,
 *       error: 'Not a number: ""',
 *     };
 *
 * @typeParam T - The validated type
 * @param input - The raw input
 */
export const isNumber: Validator<number> = (input: unknown) =>
  validateIf(
    typeof input === "number" && isFinite(input),
    input,
    input,
    "Not a number",
  );

/**
 * Validate a string
 *
 * @category Validators
 * @example
 *   isString("") >>
 *     {
 *       valid: true,
 *       parsed: "",
 *     };
 *
 *   isString(1) >>
 *     {
 *       valid: false,
 *       error: "Not a string: 1",
 *     };
 *
 * @typeParam T - The validated type
 * @param input - The raw input
 */
export const isString: Validator<string> = (input: unknown) =>
  validateIf(typeof input === "string", input, input, "Not a string");

/**
 * Validate an object
 *
 * @category Validators
 * @example
 *   isObject([]) >>
 *     {
 *       valid: true,
 *       parsed: [],
 *     };
 *
 *   isObject({}) >>
 *     {
 *       valid: true,
 *       parsed: {},
 *     };
 *
 *   isObject("") >>
 *     {
 *       valid: false,
 *       error: 'Not an object: ""',
 *     };
 *
 * @typeParam T - The validated type
 * @param input - The raw input
 */
export const isObject: Validator<object> = (input: unknown) =>
  validateIf(
    typeof input === "object" && input !== null,
    input,
    input,
    "Not an object",
  );
