import {
  isUndefined,
  isNull,
  isBoolean,
  isNumber,
  isString,
  isObject,
} from "./primitives";

describe("isUndefined", () => {
  test.each([{ input: undefined, parsed: undefined }])(
    "validates $input as $parsed",
    ({ input, parsed }) => {
      expect(isUndefined).toValidateAs(input, parsed);
    },
  );

  test.each([
    { input: null, error: "Not undefined: null" },
    { input: true, error: "Not undefined: true" },
    { input: 1, error: "Not undefined: 1" },
    { input: "", error: 'Not undefined: ""' },
    { input: "a", error: 'Not undefined: "a"' },
    { input: [], error: "Not undefined: []" },
    { input: {}, error: "Not undefined: {}" },
  ])('fails $input with "$error"', ({ input, error }) => {
    expect(isUndefined).toInvalidateWith(input, error);
  });
});

describe("isNull", () => {
  test.each([{ input: null, parsed: null }])(
    "validates $input as $parsed",
    ({ input, parsed }) => {
      expect(isNull).toValidateAs(input, parsed);
    },
  );

  test.each([
    { input: undefined, error: 'Not null: "undefined"' },
    { input: true, error: "Not null: true" },
    { input: 1, error: "Not null: 1" },
    { input: "", error: 'Not null: ""' },
    { input: "a", error: 'Not null: "a"' },
    { input: [], error: "Not null: []" },
    { input: {}, error: "Not null: {}" },
  ])('fails $input with "$error"', ({ input, error }) => {
    expect(isNull).toInvalidateWith(input, error);
  });
});

describe("isBoolean", () => {
  test.each([
    { input: true, parsed: true },
    { input: false, parsed: false },
  ])("validates $input as $parsed", ({ input, parsed }) => {
    expect(isBoolean).toValidateAs(input, parsed);
  });

  test.each([
    { input: undefined, error: 'Not a boolean: "undefined"' },
    { input: null, error: "Not a boolean: null" },
    { input: 1, error: "Not a boolean: 1" },
    { input: "", error: 'Not a boolean: ""' },
    { input: "a", error: 'Not a boolean: "a"' },
    { input: [], error: "Not a boolean: []" },
    { input: {}, error: "Not a boolean: {}" },
  ])('fails $input with "$error"', ({ input, error }) => {
    expect(isBoolean).toInvalidateWith(input, error);
  });
});

describe("isNumber", () => {
  test.each([
    { input: 0, parsed: 0 },
    { input: 1, parsed: 1 },
  ])("validates $input as $parsed", ({ input, parsed }) => {
    expect(isNumber).toValidateAs(input, parsed);
  });

  test.each([
    { input: undefined, error: 'Not a number: "undefined"' },
    { input: null, error: "Not a number: null" },
    { input: true, error: "Not a number: true" },
    { input: NaN, error: 'Not a number: "NaN"' },
    { input: Infinity, error: 'Not a number: "Infinity"' },
    { input: "", error: 'Not a number: ""' },
    { input: "a", error: 'Not a number: "a"' },
    { input: [], error: "Not a number: []" },
    { input: {}, error: "Not a number: {}" },
  ])('fails $input with "$error"', ({ input, error }) => {
    expect(isNumber).toInvalidateWith(input, error);
  });
});

describe("isString", () => {
  test.each([
    { input: "", parsed: "" },
    { input: "a", parsed: "a" },
  ])("validates $input as $parsed", ({ input, parsed }) => {
    expect(isString).toValidateAs(input, parsed);
  });

  test.each([
    { input: undefined, error: 'Not a string: "undefined"' },
    { input: null, error: "Not a string: null" },
    { input: true, error: "Not a string: true" },
    { input: 1, error: "Not a string: 1" },
    { input: [], error: "Not a string: []" },
    { input: {}, error: "Not a string: {}" },
  ])('fails $input with "$error"', ({ input, error }) => {
    expect(isString).toInvalidateWith(input, error);
  });
});

describe("isObject", () => {
  test.each([
    { input: [], parsed: [] },
    { input: { a: 1 }, parsed: { a: 1 } },
  ])("validates $input as $parsed", ({ input, parsed }) => {
    expect(isObject).toValidateAs(input, parsed);
  });

  test.each([
    { input: undefined, error: 'Not an object: "undefined"' },
    { input: null, error: "Not an object: null" },
    { input: true, error: "Not an object: true" },
    { input: 1, error: "Not an object: 1" },
    { input: NaN, error: 'Not an object: "NaN"' },
    { input: Infinity, error: 'Not an object: "Infinity"' },
  ])('fails $input with "$error"', ({ input, error }) => {
    expect(isObject).toInvalidateWith(input, error);
  });
});
