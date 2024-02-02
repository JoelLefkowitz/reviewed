import {
  arrayValidators,
  isArray,
  isArrayOf,
  isNonEmptyArray,
  isNumberArray,
  isOneOf,
  isStringArray,
} from "./arrays";
import { suite } from "../testing/suite";

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
    expect(isOneOf([1, 2, 3], 1).parsed).toBe(1);
    expect(isOneOf([1, 2, 3], 4).error).toBe("Not one of [1, 2, 3]: 4");
  });
});

describe("isArrayOf", () => {
  it("validates if an array contains only values from a set of options", () => {
    expect(isArrayOf([1, 2, 3], [3, 1]).parsed).toEqual([3, 1]);

    expect(isArrayOf([1, 2, 3], "").error).toBe('Not an array: ""');
    expect(isArrayOf([1, 2, 3], [3, 1, 4]).error).toBe(
      "Not an array of [1, 2, 3]: [3, 1, 4]",
    );
  });
});

describe("arrayValidators", () => {
  it("constructs a set of array validators", () => {
    const builds = ["dev", "prod"] as const;

    const { isOneOf: isBuild, isArrayOf: isBuildArray } =
      arrayValidators(builds);

    expect(isBuild("dev").parsed).toBe("dev");
    expect(isBuild("local").error).toBe('Not one of ["dev", "prod"]: "local"');

    expect(isBuildArray(["dev"]).parsed).toEqual(["dev"]);
    expect(isBuildArray(["dev", "local"]).error).toBe(
      'Not an array of ["dev", "prod"]: ["dev", "local"]',
    );
  });
});
