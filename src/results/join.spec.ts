import { isNumber } from "../validators/primitives";
import { mapRecord } from "../services/records";
import { mergeArray, merge } from "./join";

describe("mergeArray", () => {
  it("merges an array of valid objects", () => {
    expect(mergeArray([1, 2, 3].map(isNumber)).parsed).toEqual([
      1, 2, 3,
    ]);
  });

  it("invalidates an array containing invalid objects", () => {
    expect(mergeArray(["1", 2, "3"].map(isNumber)).error).toEqual([
      'Not a number: "1"',
      'Not a number: "3"',
    ]);
  });
});

describe("merge", () => {
  it("merges an array of valid objects", () => {
    expect(
      merge(mapRecord(isNumber, { a: 1, b: 2, c: 3 })).parsed
    ).toEqual({ a: 1, b: 2, c: 3 });
  });

  it("invalidates an array containing invalid objects", () => {
    expect(
      merge(mapRecord(isNumber, { a: "1", b: 2, c: "3" })).error
    ).toEqual({
      a: 'Not a number: "1"',
      c: 'Not a number: "3"',
    });
  });
});
