import { isRecord, isNonEmptyRecord } from "./records";

describe("isRecord", () => {
  test.each([
    { input: {}, parsed: {} },
    { input: { a: 1 }, parsed: { a: 1 } },
    { input: { a: "a" }, parsed: { a: "a" } },
    { input: { 1: "a" }, parsed: { 1: "a" } },
  ])("validates $input as record", ({ input, parsed }) => {
    expect(isRecord).toValidateAs(input, parsed);
  });

  test.each([
    { input: undefined, error: 'Not a record: "undefined"' },
    { input: null, error: "Not a record: null" },
    { input: true, error: "Not a record: true" },
    { input: 1, error: "Not a record: 1" },
    { input: "a", error: 'Not a record: "a"' },
    { input: [], error: "Not a record: []" },
  ])('fails $input with "$error"', ({ input, error }) => {
    expect(isRecord).toInvalidateWith(input, error);
  });
});

describe("isNonEmptyRecord", () => {
  test.each([
    { input: { a: 1 }, parsed: { a: 1 } },
    { input: { a: "a" }, parsed: { a: "a" } },
    { input: { 1: "a" }, parsed: { 1: "a" } },
  ])("validates $input as non-empty record", ({ input, parsed }) => {
    expect(isNonEmptyRecord).toValidateAs(input, parsed);
  });

  test.each([
    { input: undefined, error: 'Not a record: "undefined"' },
    { input: null, error: "Not a record: null" },
    { input: true, error: "Not a record: true" },
    { input: 1, error: "Not a record: 1" },
    { input: "a", error: 'Not a record: "a"' },
    { input: [], error: "Not a record: []" },
    { input: {}, error: "Not a non empty record: {}" },
  ])('fails $input with "$error"', ({ input, error }) => {
    expect(isNonEmptyRecord).toInvalidateWith(input, error);
  });
});
