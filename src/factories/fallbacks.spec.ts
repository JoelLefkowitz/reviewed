import { isNumber } from "../validators/primitives";
import { validateEachOr, validateOr } from "./fallbacks";

describe("validateOr", () => {
  it("validates an input with a fallback", () => {
    expect(validateOr(isNumber, 0, 1)).toBe(1);
    expect(validateOr(isNumber, 0, "1")).toBe(0);
  });
});

describe("validateEachOr", () => {
  it("validates an array of inputs with a fallback", () => {
    expect(validateEachOr(isNumber, 0, "")).toEqual([]);
    expect(validateEachOr(isNumber, 0, [1, 2, 3])).toEqual([1, 2, 3]);
    expect(validateEachOr(isNumber, 0, ["1", 2, "3"])).toEqual([0, 2, 0]);
  });
});
