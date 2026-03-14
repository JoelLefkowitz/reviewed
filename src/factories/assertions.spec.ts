import { assert, asserts } from "./assertions";
import { isNumber } from "../validators/primitives";

describe("assert", () => {
  it("validates an input and throws an error on failure", () => {
    expect(assert(isNumber, 1)).toBe(1);
    expect(() => assert(isNumber, null)).toThrow("Not a number: null");
  });
});

describe("asserts", () => {
  it("augments a validator to throw an error on failure", () => {
    expect(asserts(isNumber)(1)).toBe(1);
    expect(() => asserts(isNumber)(null)).toThrow("Not a number: null");
  });
});
