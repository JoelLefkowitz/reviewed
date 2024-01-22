import { isNumber } from "../validators/primitives";
import { mergeValidatedArray } from "./join";

describe("mergeValidatedArray", () => {
  it("merges an array of valid objects", () => {
    expect(mergeValidatedArray([1, 2, 3].map(isNumber)).parsed).toEqual([
      1, 2, 3,
    ]);
  });

  it("invalidates an array containing invalid objects", () => {
    expect(mergeValidatedArray(["1", 2, "3"].map(isNumber)).error).toEqual([
      'Not a number: "1"',
      'Not a number: "3"',
    ]);
  });
});

// describe("mergeValidatedObject", () => {
//   it("merges an array of valid objects", () => {
//     expect(
//       mergeValidatedObject(mapRecord(isNumber, { a: 1, b: 2, c: 3 })).parsed,
//     ).toEqual({ a: 1, b: 2, c: 3 });
//   });

//   it("invalidates an array containing invalid objects", () => {
//     expect(
//       mergeValidatedObject(mapRecord(isNumber, { a: "1", b: 2, c: "3" })).error,
//     ).toEqual({
//       a: 'Not a number: "1"',
//       c: 'Not a number: "3"',
//     });
//   });
// });
