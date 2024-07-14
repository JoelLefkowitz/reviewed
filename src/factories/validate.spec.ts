import { isNaturalNumberString } from "../validators/strings";
import { isNumber, isString } from "../validators/primitives";
import { optional } from "./transform";
import { validate, validateWith, validateWithAtLeast } from "./validate";

describe("validate", () => {
  it("wraps a valid object", () => {
    expect(validate<number>(1)).toEqual({
      valid: true,
      input: 1,
      parsed: 1,
      error: null,
    });

    expect(validate<number>("1", 1)).toEqual({
      valid: true,
      input: "1",
      parsed: 1,
      error: null,
    });
  });
});

describe("validateWith", () => {
  it("validates an input's fields with validators", () => {
    expect(
      validateWith({ a: isNumber, b: isString })({ a: 1, b: "2" }),
    ).toEqual({
      valid: true,
      input: { a: 1, b: "2" },
      parsed: { a: 1, b: "2" },
      error: null,
    });

    expect(validateWith({ a: isNumber, b: isString })("")).toEqual({
      valid: false,
      input: "",
      parsed: null,
      error: 'Not a record: ""',
    });

    expect(validateWith({ a: isNumber, b: isString })({ a: 1, b: 2 })).toEqual({
      valid: false,
      input: { a: 1, b: 2 },
      parsed: null,
      error: { b: "Not a string: 2" },
    });
  });

  it("requires exactly the specified fields", () => {
    expect(validateWith({ a: isNumber, b: isString })({ a: 1 })).toEqual({
      valid: false,
      input: { a: 1 },
      parsed: null,
      error: "Missing required fields: b",
    });

    expect(
      validateWith({ a: isNumber, b: isString })({ a: 1, b: "2", c: null }),
    ).toEqual({
      valid: false,
      input: { a: 1, b: "2", c: null },
      parsed: null,
      error: "Unexpected extra fields: c",
    });
  });

  it("parses optional fields", () => {
    const validator = validateWith<{ a: string; b?: number }>({
      a: isString,
      b: optional(isNaturalNumberString),
    });

    expect(validator({ a: "1" }).valid).toBe(true);
    expect(validator({ a: "1" }).parsed).toEqual({ a: "1", b: undefined });

    expect(validator({ a: "1", b: undefined }).valid).toBe(true);
    expect(validator({ a: "1", b: undefined }).parsed).toEqual({
      a: "1",
      b: undefined,
    });

    expect(validator({ a: "1", b: 1 }).error).toEqual({ b: "Not a string: 1" });
    expect(validator({ a: "1", b: "1" }).parsed).toEqual({ a: "1", b: 1 });
  });
});

describe("validateWithAtLeast", () => {
  it("validates an input's fields with validators", () => {
    expect(
      validateWithAtLeast({ a: isNumber, b: isString })({ a: 1, b: "2" }),
    ).toEqual({
      valid: true,
      input: { a: 1, b: "2" },
      parsed: { a: 1, b: "2" },
      error: null,
    });

    expect(validateWithAtLeast({ a: isNumber, b: isString })("")).toEqual({
      valid: false,
      input: "",
      parsed: null,
      error: 'Not a record: ""',
    });

    expect(
      validateWithAtLeast({ a: isNumber, b: isString })({ a: 1, b: 2 }),
    ).toEqual({
      valid: false,
      input: { a: 1, b: 2 },
      parsed: null,
      error: { b: "Not a string: 2" },
    });
  });

  it("allows extra fields", () => {
    expect(validateWithAtLeast({ a: isNumber, b: isString })({ a: 1 })).toEqual(
      {
        valid: false,
        input: { a: 1 },
        parsed: null,
        error: "Missing required fields: b",
      },
    );

    expect(
      validateWithAtLeast({ a: isNumber, b: isString })({
        a: 1,
        b: "2",
        c: null,
      }),
    ).toEqual({
      valid: true,
      input: { a: 1, b: "2", c: null },
      parsed: { a: 1, b: "2", c: null },
      error: null,
    });
  });

  it("parses optional fields", () => {
    const validator = validateWithAtLeast<{ a: string; b?: number }>({
      a: isString,
      b: optional(isNaturalNumberString),
    });

    expect(validator({ a: "1" }).valid).toBe(true);
    expect(validator({ a: "1" }).parsed).toEqual({ a: "1", b: undefined });

    expect(validator({ a: "1", b: undefined }).valid).toBe(true);
    expect(validator({ a: "1", b: undefined }).parsed).toEqual({
      a: "1",
      b: undefined,
    });

    expect(validator({ a: "1", b: 1 }).error).toEqual({ b: "Not a string: 1" });
    expect(validator({ a: "1", b: "1" }).parsed).toEqual({ a: "1", b: 1 });
  });
});
