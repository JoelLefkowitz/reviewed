import { isNumber } from "../validators/primitives";
import { merge } from "./join";

describe("merge", () => {
  it("merges an array of valid objects", () => {
    expect(merge([1, 2, 3].map(isNumber)).parsed).toEqual([1, 2, 3]);
  });

  it("invalidates an array containing invalid objects", () => {
    expect(merge(["1", 2, "3"].map(isNumber)).error).toBe(
      '[Not a number: "1", Not a number: "3"]: ["1",2,"3"]',
    );
  });
});
