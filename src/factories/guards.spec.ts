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
    const isNumber = fromGuard(
      (input): input is number => typeof input === "number" && !isNaN(input),
      "Not a number",
    );

    expect(isNumber(1).parsed).toBe(1);
  });
});
