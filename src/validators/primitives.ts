import { Validator } from "../models/validation/Validator.model";
import { validateIf } from "../factories/validate";

/**
 * Validate an input is undefined
 *
 * @category Validators
 *
 * @typeParam T - the validated type
 * @param input - the raw input
 *
 * @example
 * ```ts
 * isUndefined(undefined) -> { valid: true,  parsed: undefined, ... }
 * isUndefined(null)      -> { valid: false, error: "Not undefined: null", ... }
 * ```
 */
export const isUndefined: Validator<undefined> = (input: unknown) =>
  validateIf(input === undefined, "Not undefined", input);

/**
 * Validate an input is null
 *
 * @category Validators
 *
 * @typeParam T - the validated type
 * @param input - the raw input
 *
 * @example
 * ```ts
 * isNull(null)      -> { valid: true,  parsed: null, ... }
 * isNull(undefined) -> { valid: false, error: "Not null: undefined", ... }
 * ```
 */
export const isNull: Validator<null> = (input: unknown) =>
  validateIf(input === null, "Not null", input);

/**
 * Validate a boolean
 *
 * @category Validators
 *
 * @typeParam T - the validated type
 * @param input - the raw input
 *
 * @example
 * ```ts
 * isBoolean(true)  -> { valid: true,  parsed: true, ... }
 * isBoolean(false) -> { valid: true,  parsed: false, ... }
 * isBoolean("")    -> { valid: false, error: 'Not a boolean: ""', ... }
 * ```
 */
export const isBoolean: Validator<boolean> = (input: unknown) =>
  validateIf(typeof input === "boolean", "Not a boolean", input);

/**
 * Validate a number
 *
 * @category Validators
 *
 * @typeParam T - the validated type
 * @param input - the raw input
 *
 * @example
 * ```ts
 * isNumber(1)  -> { valid: true,  parsed: 1, ... }
 * isNumber("") -> { valid: false, error: 'Not a number: ""', ... }
 * ```
 */
export const isNumber: Validator<number> = (input: unknown) =>
  validateIf(
    typeof input === "number" && isFinite(input),
    "Not a number",
    input,
  );

/**
 * Validate a string
 *
 * @category Validators
 *
 * @typeParam T - the validated type
 * @param input - the raw input
 *
 * @example
 * ```ts
 * isString("") -> { valid: true,  parsed: "", ... }
 * isString(1)  -> { valid: false, error: "Not a string: 1", ... }
 * ```
 */
export const isString: Validator<string> = (input: unknown) =>
  validateIf(typeof input === "string", "Not a string", input);

/**
 * Validate an object
 *
 * @category Validators
 *
 * @typeParam T - the validated type
 * @param input - the raw input
 *
 * @example
 * ```ts
 * isObject([]) -> { valid: true,  parsed: [], ... }
 * isObject({}) -> { valid: true,  parsed: {}, ... }
 * isObject("") -> { valid: false, error: 'Not an object: ""', ... }
 * ```
 */
export const isObject: Validator<object> = (input: unknown) =>
  validateIf(
    typeof input === "object" && input !== null,
    "Not an object",
    input,
  );
