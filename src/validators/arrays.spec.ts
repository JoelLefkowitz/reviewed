import {
  isArray,
  isManyOf,
  isNonEmptyArray,
  isNumberArray,
  isOneOf,
  isStringArray,
} from "./arrays";
import { validates } from "../testing/cases";

describe("isArray", () => {
  validates(
    isArray,
    [
      {
        input: [],
        parsed: [],
      },
      {
        input: [1],
        parsed: [1],
      },
    ],
    [
      {
        input: undefined,
        error: 'Not an array: "undefined"',
      },
      {
        input: null,
        error: "Not an array: null",
      },
      {
        input: true,
        error: "Not an array: true",
      },
      {
        input: 1,
        error: "Not an array: 1",
      },
      {
        input: "a",
        error: 'Not an array: "a"',
      },
      {
        input: {},
        error: "Not an array: {}",
      },
    ],
  );
});

describe("isNonEmptyArray", () => {
  validates(
    isNonEmptyArray,
    [
      {
        input: [1],
        parsed: [1],
      },
    ],
    [
      {
        input: undefined,
        error: 'Not an array: "undefined"',
      },
      {
        input: null,
        error: "Not an array: null",
      },
      {
        input: true,
        error: "Not an array: true",
      },
      {
        input: 1,
        error: "Not an array: 1",
      },
      {
        input: "a",
        error: 'Not an array: "a"',
      },
      {
        input: {},
        error: "Not an array: {}",
      },
      {
        input: [],
        error: "Not a non empty array: []",
      },
    ],
  );
});

describe("isNumberArray", () => {
  validates(
    isNumberArray,
    [
      {
        input: [],
        parsed: [],
      },
      {
        input: [1],
        parsed: [1],
      },
    ],
    [
      {
        input: undefined,
        error: 'Not an array: "undefined"',
      },
      {
        input: null,
        error: "Not an array: null",
      },
      {
        input: true,
        error: "Not an array: true",
      },
      {
        input: 1,
        error: "Not an array: 1",
      },
      {
        input: "a",
        error: 'Not an array: "a"',
      },
      {
        input: {},
        error: "Not an array: {}",
      },
      {
        input: ["a"],
        error: 'Not an array of numbers: ["a"]',
      },
    ],
  );
});

describe("isStringArray", () => {
  validates(
    isStringArray,
    [
      {
        input: [],
        parsed: [],
      },
      {
        input: ["a"],
        parsed: ["a"],
      },
    ],
    [
      {
        input: undefined,
        error: 'Not an array: "undefined"',
      },
      {
        input: null,
        error: "Not an array: null",
      },
      {
        input: true,
        error: "Not an array: true",
      },
      {
        input: 1,
        error: "Not an array: 1",
      },
      {
        input: "a",
        error: 'Not an array: "a"',
      },
      {
        input: {},
        error: "Not an array: {}",
      },
      {
        input: [1],
        error: "Not an array of strings: [1]",
      },
    ],
  );
});

describe("isOneOf", () => {
  const validator = isOneOf([1, 2, 3]);

  it("validates if an object is a value from a set of options", () => {
    expect(validator).toValidate(1);
    expect(validator).toInvalidateWith(4, "Not one of [1, 2, 3]: 4");
  });
});

describe("isManyOf", () => {
  const validator = isManyOf([1, 2, 3]);

  it("validates if an array contains only values from a set of options", () => {
    expect(validator).toValidate([1]);
    expect(validator).toInvalidateWith("", 'Not an array: ""');
    expect(validator).toInvalidateWith(
      [1, 2, 4],
      "Not an array of [1, 2, 3]: [1, 2, 4]",
    );
  });
});
