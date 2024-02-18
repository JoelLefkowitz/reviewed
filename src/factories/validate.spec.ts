import { isNumber, isString } from "../validators/primitives";
import { validate, validateWith } from "./validate";

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
});
