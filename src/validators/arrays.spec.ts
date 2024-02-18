import {
  isArray,
  isManyOf,
  isNonEmptyArray,
  isNumberArray,
  isOneOf,
  isStringArray,
} from "./arrays";
import { suite } from "../testing/suites";

suite(
  isArray,
  [
    { input: [], parsed: [] },
    { input: [1], parsed: [1] },
  ],
  {
    "Not an array": [undefined, null, true, 1, "a", {}],
  },
);

suite(isNonEmptyArray, [{ input: [1], parsed: [1] }], {
  "Not an array": [undefined, null, true, 1, "a", {}],
  "Not a non empty array": [[]],
});

suite(
  isNumberArray,
  [
    { input: [], parsed: [] },
    { input: [1], parsed: [1] },
  ],
  {
    "Not an array": [undefined, null, true, 1, "a", {}],
    "Not an array of numbers": [["a"]],
  },
);

suite(
  isStringArray,
  [
    { input: [], parsed: [] },
    { input: ["a"], parsed: ["a"] },
  ],
  {
    "Not an array": [undefined, null, true, 1, "a", {}],
    "Not an array of strings": [[1]],
  },
);

describe("isOneOf", () => {
  it("validates if an object is a value from a set of options", () => {
    expect(isOneOf([1, 2, 3])(1).parsed).toBe(1);
    expect(isOneOf([1, 2, 3])(4).error).toBe("Not one of [1, 2, 3]: 4");
  });
});

describe("isManyOf", () => {
  it("validates if an array contains only values from a set of options", () => {
    expect(isManyOf([1, 2, 3])([3, 1]).parsed).toEqual([3, 1]);

    expect(isManyOf([1, 2, 3])("").error).toBe('Not an array: ""');
    expect(isManyOf([1, 2, 3])([3, 1, 4]).error).toBe(
      "Not an array of [1, 2, 3]: [3, 1, 4]",
    );
  });
});
