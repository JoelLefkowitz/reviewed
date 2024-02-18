import { all, any, merge, sieve } from "./results";
import { isNumber } from "../validators/primitives";
import { mapRecord } from "../internal/records";

describe("all", () => {
  it("merges an array of validated results using a logical AND", () => {
    expect(all([]).parsed).toEqual([]);
    expect(all([1, 2, 3].map(isNumber)).parsed).toEqual([1, 2, 3]);
  });

  it("invalidates only the invalidated results of an array", () => {
    expect(all(["1", 2, "3"].map(isNumber)).error).toEqual([
      'Not a number: "1"',
      'Not a number: "3"',
    ]);
  });
});

describe("any", () => {
  it("merges an array of validated results using a logical OR", () => {
    expect(any(["1", 2, "3"].map(isNumber)).parsed).toEqual([2]);
  });

  it("invalidates an empty array", () => {
    expect(any([]).error).toBe("Not a non empty array: []");
  });

  it("invalidates an entirely invalidated array", () => {
    expect(any(["1", "2", "3"].map(isNumber)).error).toEqual([
      'Not a number: "1"',
      'Not a number: "2"',
      'Not a number: "3"',
    ]);
  });
});

describe("merge", () => {
  it("merges the validated fields of an object", () => {
    expect(merge(mapRecord(isNumber, { a: 1, b: 2, c: 3 })).parsed).toEqual({
      a: 1,
      b: 2,
      c: 3,
    });
  });

  it("invalidates only the invalidated fields of an object", () => {
    expect(merge(mapRecord(isNumber, { a: "1", b: 2, c: "3" })).error).toEqual({
      a: 'Not a number: "1"',
      c: 'Not a number: "3"',
    });
  });
});

describe("sieve", () => {
  it("selects parsed results from validated fields", () => {
    expect(sieve(mapRecord(isNumber, { a: "1", b: 2, c: "3" }))).toEqual({
      b: 2,
    });
  });
});
