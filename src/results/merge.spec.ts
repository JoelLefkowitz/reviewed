import { isNumber } from "../validators/primitives";
import { mapRecord } from "../services/records";
import { merge, mergeArray } from "./merge";

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

describe("mergeArray", () => {
  it("merges an array of validated results", () => {
    expect(mergeArray([1, 2, 3].map(isNumber)).parsed).toEqual([1, 2, 3]);
  });

  it("invalidates the invalidated results of an array", () => {
    expect(mergeArray(["1", 2, "3"].map(isNumber)).error).toEqual([
      'Not a number: "1"',
      'Not a number: "3"',
    ]);
  });
});
