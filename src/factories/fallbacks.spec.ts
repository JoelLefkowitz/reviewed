import { isNumber } from "../validators/primitives";
import { validateEachOr, validateOr, validatedOr } from "./fallbacks";

describe("validateOr", () => {
  it("validates an input with a fallback", () => {
    expect(validateOr(isNumber, 0)(1)).toBe(1);
    expect(validateOr(isNumber, 0)("1")).toBe(0);
  });
});

describe("validatedOr", () => {
  it("provide a fallback for a validation result", () => {
    expect(validatedOr(isNumber(1), 0)).toBe(1);
    expect(validatedOr(isNumber("1"), 0)).toBe(0);
  });
});

describe("validateEachOr", () => {
  it("validates an array of inputs with a fallback", () => {
    expect(validateEachOr(isNumber, 0)("")).toEqual([]);
    expect(validateEachOr(isNumber, 0)([1, 2, 3])).toEqual([1, 2, 3]);
    expect(validateEachOr(isNumber, 0)(["1", 2, "3"])).toEqual([0, 2, 0]);
  });
});
