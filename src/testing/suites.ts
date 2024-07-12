import { Validator } from "../models/validators";

/**
 * Construct a test suite for a validator
 *
 * @category Testing
 * @example
 *   suite(
 *     isStringArray,
 *     [
 *       { input: [], parsed: [] },
 *       { input: ["a"], parsed: ["a"] },
 *     ],
 *     {
 *       "Not an array": [undefined, null, true, 1, "a", {}],
 *       "Not an array of strings": [[1]],
 *     },
 *   );
 *
 * @typeParam T - The validated type
 * @param validator - The validator to test
 * @param valid     - An array of valid raw and parsed inputs
 * @param invalid   - A mapping of validation errors and invalid inputs
 * @param name      - The name of the validator to test
 */
export const suite = <T>(
  validator: Validator<T>,
  valid: { input: unknown; parsed: T }[],
  invalid: Record<string, unknown[]>,
  name: string = validator.name,
): void => {
  describe(name, () => {
    it("passes a valid objects", () => {
      valid.forEach(({ input, parsed }) => {
        expect(validator).toValidateAs(input, parsed);
      });
    });

    it("fails invalid objects", () => {
      Object.entries(invalid).forEach(([reason, cases]) => {
        cases.forEach((input) => {
          expect(validator).toInvalidateWith(input, reason);
        });
      });
    });
  });
};
