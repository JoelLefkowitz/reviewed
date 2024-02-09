import { Validated } from "../models/validation/Validated.model";
import { Validator } from "../models/validation/Validator.model";

/**
 * Chain a validator to a validated result
 *
 * @category Results
 *
 * @typeParam T - the validated type
 * @typeParam U - the validation errors type
 * @typeParam T - the new validated type
 * @param results - the validated results to merge
 * @param validator - the validator to chain
 *
 * @example
 * ```ts
 * ...
 * mapValidated(isNonEmptyArray([1, 2, 3]), isNumberArray) ->
 *   { valid: true, parsed: [1, 2, 3], ... };
 *
 * mapValidated(isString(1), isNumber) ->
 *   { valid: false, error: "Not a string: 1", ... };
 * ```
 */
export const mapValidated = <T, U, V>(
  result: Validated<T, U>,
  validator: Validator<V>,
) => (result.valid ? validator(result.parsed) : result);
