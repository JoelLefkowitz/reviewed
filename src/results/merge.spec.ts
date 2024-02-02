import { allValid, anyValid, merge } from "./merge";
import { isNumber } from "../validators/primitives";
import { mapRecord } from "../services/records";

describe("merge", () => {
  it("merges the validated fields of an object", () => {
    expect(merge(mapRecord(isNumber, { a: 1, b: 2, c: 3 })).parsed).toEqual({
      a: 1,
      b: 2,
      c: 3,
    });
  });

  it("invalidates the invalidated fields of an object", () => {
    expect(merge(mapRecord(isNumber, { a: "1", b: 2, c: "3" })).error).toEqual({
      a: 'Not a number: "1"',
      c: 'Not a number: "3"',
    });
  });
});

describe("allValid", () => {
  it("merges an array of validated results using a logical AND", () => {
    expect(allValid([].map(isNumber)).parsed).toEqual([]);
    expect(allValid([1, 2, 3].map(isNumber)).parsed).toEqual([1, 2, 3]);
  });

  it("invalidates the invalidated results of an array", () => {
    expect(allValid(["1", 2, "3"].map(isNumber)).error).toEqual([
      'Not a number: "1"',
      'Not a number: "3"',
    ]);
  });
});

describe("anyValid", () => {
  it("merges an array of validated results using a logical OR", () => {
    expect(anyValid(["1", 2, "3"].map(isNumber)).parsed).toBe(2);
    expect(anyValid(["1", 2, 3].map(isNumber)).parsed).toBe(2);
  });

  it("invalidates an empty array", () => {
    expect(anyValid([]).error).toBe("Not a non empty array: []");
  });

  it("invalidates an entirely invalidated array", () => {
    expect(anyValid(["1", "2", "3"].map(isNumber)).error).toEqual([
      'Not a number: "1"',
      'Not a number: "2"',
      'Not a number: "3"',
    ]);
  });
});
