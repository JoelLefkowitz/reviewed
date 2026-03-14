import { fromGuard, guard, guards } from "./guards";
import { isNumber } from "../validators/primitives";

describe("guard", () => {
  it("validates and casts an input", () => {
    expect(guard(isNumber, 1)).toBe(true);
  });
});

describe("guards", () => {
  it("augments a validator to cast an input", () => {
    expect(guards(isNumber)(1)).toBe(true);
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
