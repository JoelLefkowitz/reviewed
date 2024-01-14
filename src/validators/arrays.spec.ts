import {
  isArray,
  isArrayOf,
  isNumberArray,
  isOneOf,
  isStringArray,
} from "./arrays";
import { suite } from "../services/suite";

suite({
  name: "isArray",
  validator: isArray,
  valid: [
    [[], []],
    [[1], [1]],
  ],
  invalid: {
    "Not an array": [undefined, null, true, 1, "a", {}],
  },
});

suite({
  name: "isNumberArray",
  validator: isNumberArray,
  valid: [
    [[], []],
    [[1], [1]],
  ],
  invalid: {
    "Not an array": [undefined, null, true, 1, "a", {}],
    "Not an array of numbers": [["a"]],
  },
});

suite({
  name: "isStringArray",
  validator: isStringArray,
  valid: [
    [[], []],
    [["a"], ["a"]],
  ],
  invalid: {
    "Not an array": [undefined, null, true, 1, "a", {}],
    "Not an array of strings": [[1]],
  },
});

describe("isOneOf", () => {
  it("validates if an object is a value from a set of options", () => {
    expect(isOneOf([1, 2, 3], 1).parsed).toBe(1);
    expect(isOneOf([1, 2, 3], 4).error).toBe("Not one of [1,2,3]: 4");
  });
});

describe("isArrayOf", () => {
  it("validates if an array contains only values from a set of options", () => {
    expect(isArrayOf([1, 2, 3], [3, 1]).parsed).toEqual([3, 1]);
    expect(isArrayOf([1, 2, 3], [3, 1, 4]).error).toBe(
      "Not an array of [1,2,3]: [3,1,4]",
    );
  });
});
