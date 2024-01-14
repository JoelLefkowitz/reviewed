import { isNumber } from "../validators/primitives";

describe("validate", () => {
  it("wraps a valid object", () => {
    expect(isNumber(1).parsed).toBe(1);
  });
});

describe("invalidate", () => {
  it("wraps an invalid object", () => {
    expect(isNumber("1").error).toBe('Not a number: "1"');
  });
});
