import {
  isManyOf,
  isOneOf,
  isArray,
  isNonEmptyArray,
  isNumberArray,
  isStringArray,
} from "./arrays";

describe("isArray", () => {
  test.each([
    { input: [], parsed: [] },
    { input: [1], parsed: [1] },
  ])("validates $input as array", ({ input, parsed }) => {
    expect(isArray).toValidateAs(input, parsed);
  });

  test.each([
    { input: undefined, error: 'Not an array: "undefined"' },
    { input: null, error: "Not an array: null" },
    { input: true, error: "Not an array: true" },
    { input: 1, error: "Not an array: 1" },
    { input: "a", error: 'Not an array: "a"' },
    { input: {}, error: "Not an array: {}" },
  ])('fails $input with "$error"', ({ input, error }) => {
    expect(isArray).toInvalidateWith(input, error);
  });
});

describe("isNonEmptyArray", () => {
  test.each([{ input: [1], parsed: [1] }])(
    "validates $input as non-empty array",
    ({ input, parsed }) => {
      expect(isNonEmptyArray).toValidateAs(input, parsed);
    },
  );

  test.each([
    { input: undefined, error: 'Not an array: "undefined"' },
    { input: null, error: "Not an array: null" },
    { input: true, error: "Not an array: true" },
    { input: 1, error: "Not an array: 1" },
    { input: "a", error: 'Not an array: "a"' },
    { input: {}, error: "Not an array: {}" },
    { input: [], error: "Not a non empty array: []" },
  ])('fails $input with "$error"', ({ input, error }) => {
    expect(isNonEmptyArray).toInvalidateWith(input, error);
  });
});

describe("isNumberArray", () => {
  test.each([
    { input: [], parsed: [] },
    { input: [1], parsed: [1] },
  ])("validates $input as number array", ({ input, parsed }) => {
    expect(isNumberArray).toValidateAs(input, parsed);
  });

  test.each([
    { input: undefined, error: 'Not an array: "undefined"' },
    { input: null, error: "Not an array: null" },
    { input: true, error: "Not an array: true" },
    { input: 1, error: "Not an array: 1" },
    { input: "a", error: 'Not an array: "a"' },
    { input: {}, error: "Not an array: {}" },
    { input: ["a"], error: 'Not an array of numbers: ["a"]' },
  ])('fails $input with "$error"', ({ input, error }) => {
    expect(isNumberArray).toInvalidateWith(input, error);
  });
});

describe("isStringArray", () => {
  test.each([
    { input: [], parsed: [] },
    { input: ["a"], parsed: ["a"] },
  ])("validates $input as string array", ({ input, parsed }) => {
    expect(isStringArray).toValidateAs(input, parsed);
  });

  test.each([
    { input: undefined, error: 'Not an array: "undefined"' },
    { input: null, error: "Not an array: null" },
    { input: true, error: "Not an array: true" },
    { input: 1, error: "Not an array: 1" },
    { input: "a", error: 'Not an array: "a"' },
    { input: {}, error: "Not an array: {}" },
    { input: [1], error: "Not an array of strings: [1]" },
  ])('fails $input with "$error"', ({ input, error }) => {
    expect(isStringArray).toInvalidateWith(input, error);
  });
});

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
