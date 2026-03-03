import {
  isBooleanString,
  isNumberString,
  isIntegerString,
  isNaturalNumberString,
  isJSONString,
} from "./strings";

describe("isBooleanString", () => {
  test.each([
    { input: "true", parsed: true },
    { input: "false", parsed: false },
  ])("validates $input as $parsed", ({ input, parsed }) => {
    expect(isBooleanString).toValidateAs(input, parsed);
  });

  test.each([
    { input: undefined, error: 'Not a string: "undefined"' },
    { input: null, error: "Not a string: null" },
    { input: true, error: "Not a string: true" },
    { input: 1, error: "Not a string: 1" },
    { input: [], error: "Not a string: []" },
    { input: {}, error: "Not a string: {}" },
  ])('fails $input with "$error"', ({ input, error }) => {
    expect(isBooleanString).toInvalidateWith(input, error);
  });
});

describe("isNumberString", () => {
  test.each([
    { input: "-1", parsed: -1 },
    { input: "0", parsed: 0 },
    { input: "0.5", parsed: 0.5 },
    { input: "1", parsed: 1 },
  ])("validates $input as $parsed", ({ input, parsed }) => {
    expect(isNumberString).toValidateAs(input, parsed);
  });

  test.each([
    { input: undefined, error: 'Not a string: "undefined"' },
    { input: null, error: "Not a string: null" },
    { input: true, error: "Not a string: true" },
    { input: 1, error: "Not a string: 1" },
    { input: [], error: "Not a string: []" },
    { input: {}, error: "Not a string: {}" },
    { input: "", error: 'Not a number string: ""' },
    { input: "true", error: 'Not a number string: "true"' },
    { input: "a", error: 'Not a number string: "a"' },
    { input: "NaN", error: 'Not a number string: "NaN"' },
    { input: "Infinity", error: 'Not a number string: "Infinity"' },
  ])('fails $input with "$error"', ({ input, error }) => {
    expect(isNumberString).toInvalidateWith(input, error);
  });
});

describe("isIntegerString", () => {
  test.each([
    { input: "-1", parsed: -1 },
    { input: "0", parsed: 0 },
    { input: "1", parsed: 1 },
  ])("validates $input as $parsed", ({ input, parsed }) => {
    expect(isIntegerString).toValidateAs(input, parsed);
  });

  test.each([
    { input: undefined, error: 'Not a string: "undefined"' },
    { input: null, error: "Not a string: null" },
    { input: true, error: "Not a string: true" },
    { input: 1, error: "Not a string: 1" },
    { input: [], error: "Not a string: []" },
    { input: {}, error: "Not a string: {}" },
    { input: "", error: 'Not a number string: ""' },
    { input: "true", error: 'Not a number string: "true"' },
    { input: "a", error: 'Not a number string: "a"' },
    { input: "NaN", error: 'Not a number string: "NaN"' },
    { input: "Infinity", error: 'Not a number string: "Infinity"' },
    { input: "0.5", error: 'Not an integer string: "0.5"' },
  ])('fails $input with "$error"', ({ input, error }) => {
    expect(isIntegerString).toInvalidateWith(input, error);
  });
});

describe("isNaturalNumberString", () => {
  test.each([{ input: "1", parsed: 1 }])(
    "validates $input as $parsed",
    ({ input, parsed }) => {
      expect(isNaturalNumberString).toValidateAs(input, parsed);
    },
  );

  test.each([
    { input: undefined, error: 'Not a string: "undefined"' },
    { input: null, error: "Not a string: null" },
    { input: true, error: "Not a string: true" },
    { input: 1, error: "Not a string: 1" },
    { input: [], error: "Not a string: []" },
    { input: {}, error: "Not a string: {}" },
    { input: "", error: 'Not a number string: ""' },
    { input: "true", error: 'Not a number string: "true"' },
    { input: "a", error: 'Not a number string: "a"' },
    { input: "NaN", error: 'Not a number string: "NaN"' },
    { input: "Infinity", error: 'Not a number string: "Infinity"' },
    { input: "0.5", error: 'Not an integer string: "0.5"' },
    { input: "0", error: 'Not a natural number string: "0"' },
    { input: "-1", error: 'Not a natural number string: "-1"' },
  ])('fails $input with "$error"', ({ input, error }) => {
    expect(isNaturalNumberString).toInvalidateWith(input, error);
  });
});

describe("isJSONString", () => {
  test.each([{ input: '{"a": 1}', parsed: { a: 1 } }])(
    "validates $input as $parsed",
    ({ input, parsed }) => {
      expect(isJSONString).toValidateAs(input, parsed);
    },
  );

  test.each([{ input: "_", error: 'Not JSON: "_"' }])(
    'fails $input with "$error"',
    ({ input, error }) => {
      expect(isJSONString).toInvalidateWith(input, error);
    },
  );
});
