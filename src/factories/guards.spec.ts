import { fromGuard, guard } from "./guards";
import { isNumber } from "../validators/primitives";

describe("guard", () => {
  it("constructs a guard from a validator", () => {
    const isNumberGuard = guard(isNumber);
    
    expect(isNumberGuard(1)).toBe(true);
  });
});

describe("fromGuard", () => {
  it("constructs a validator from a guard", () => {
    const guard = (input: unknown): input is number =>
      typeof input === "number" && !isNaN(input);

    const validator = fromGuard(guard, "Not a number");

    expect(validator).toValidate(1);
    expect(validator).toInvalidateWith("", 'Not a number: ""');
  });
});
