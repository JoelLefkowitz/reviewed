import { ValidatorTest } from "../models/ValidatorTest.model";
import { invalidate } from "../factories/validate";

export const suite = <T>({
  name,
  validator,
  valid,
  invalid,
}: ValidatorTest<T>): void =>
  describe(name, () => {
    it("passes a valid objects", () => {
      valid.forEach(([input, parsed]) => {
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
