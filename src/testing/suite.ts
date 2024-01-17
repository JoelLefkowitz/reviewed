import { Validator } from "../models/validation/Validator.model";
import { invalidate } from "../factories/validate";

/**
 * Construct a test suite for a validator
 *
 * @category Testing
 *
 * @typeParam T - the validated type
 * @param validator - the validator to test
 * @param valid - an array of valid raw and parsed inputs
 * @param invalid - a mapping of rejections and invalid inputs
 * @param name - the name of the validator to test
 *
 * @example
 * ```ts
 * suite(
 *   isStringArray,
 *   [
 *     { input: [], parsed: [] },
 *     { input: ["a"], parsed: ["a"] },
 *   ],
 *   {
 *     "Not an array": [undefined, null, true, 1, "a", {}],
 *     "Not an array of strings": [[1]],
 *   },
 * });
 * ```
 */
export const suite = <T>(
  validator: Validator<T>,
  valid: { input: unknown; parsed: T }[],
  invalid: Record<string, unknown[]>,
  name: string = validator.name,
): void =>
  describe(name, () => {
    it("passes a valid objects", () => {
      valid.forEach(({ input, parsed }) => {
        expect(validator(input).parsed).toEqual(parsed);
      });
    });

    it("fails invalid objects", () => {
      Object.entries(invalid).forEach(([reason, cases]) => {
        cases.forEach((input) => {
          expect(validator(input).error).toBe(invalidate(input, reason).error);
        });
      });
    });
  });
