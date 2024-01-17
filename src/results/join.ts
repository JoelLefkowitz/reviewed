import { Validated } from "../models/validation/Validated.model";
import { errors, validated } from "./filter";
import { invalidate, validate } from "../factories/validate";

/**
 * Merge an array of validated results into a validated array
 *
 * @category Results
 *
 * @typeParam T - the validated type
 * @param results - the results to merge
 *
 * @example
 * ```ts
 * merge([1, 2, 3].map(isNumber) -> { valid: true, parsed: [1, 2, 3], ... }
 *
 * merge(["1", 2, "3"].map(isNumber) ->
 *   { valid: false, error: '[Not a number: "1", Not a number: "3"]: ["1",2,"3"]', ... }
 * ```
 */
export const merge = <T>(results: Validated<T>[]): Validated<T[]> => {
  const { valid, inputs } = results.reduce<{
    inputs: unknown[];
    valid: boolean;
  }>(
    (acc, x) => ({
      valid: acc.valid && x.valid,
      inputs: acc.inputs.concat(x.input),
    }),
    { valid: true, inputs: [] },
  );

  return valid
    ? validate(inputs, validated(results))
    : invalidate(inputs, `[${errors(results).join(", ")}]`);
};
