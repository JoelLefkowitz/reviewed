import {
  invalidate,
  invalidateWith,
  validate,
  validateEach,
  validateIf,
  validateRegex,
} from "./validate";
import { isNumber } from "../validators/primitives";

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

describe("invalidate", () => {
  it("wraps an invalid object", () => {
    expect(invalidate<number, string>("", "error")).toEqual({
      valid: false,
      input: "",
      parsed: null,
      error: "error",
    });
  });
});

describe("invalidateWith", () => {
  it("wraps an invalid object", () => {
    expect(invalidateWith<number>("", "Not a number")).toEqual({
      valid: false,
      input: "",
      parsed: null,
      error: 'Not a number: ""',
    });
  });
});

describe("validateIf", () => {
  it("validates an input based on a condition", () => {
    expect(validateIf(true, "1", 1, "Not a number")).toEqual({
      valid: true,
      input: "1",
      parsed: 1,
      error: null,
    });

    expect(validateIf(false, "", "", "Not a number")).toEqual({
      valid: false,
      input: "",
      parsed: null,
      error: 'Not a number: ""',
    });
  });
});

describe("validateEach", () => {
  it("validates an array of inputs", () => {
    expect(validateEach(isNumber, [1, 2, 3])).toEqual({
      valid: true,
      input: [1, 2, 3],
      parsed: [1, 2, 3],
      error: null,
    });

    expect(validateEach(isNumber, {})).toEqual({
      valid: false,
      input: {},
      parsed: null,
      error: "Not an array: {}",
    });

    expect(validateEach(isNumber, ["1", 2, "3"])).toEqual({
      valid: false,
      input: ["1", 2, "3"],
      parsed: null,
      error: ['Not a number: "1"', 'Not a number: "3"'],
    });
  });
});

describe("validateRegex", () => {
  it("validates an input using a regex", () => {
    const validator = validateRegex(
      /^(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})$/u,
      "Not a yyyy-mm-dd date",
    );

    const parsed = {
      match: "1234-12-12",
      index: 0,
      captured: ["1234", "12", "12"],
      named: { year: "1234", month: "12", day: "12" },
    };

    expect(validator("1234-12-12")).toEqual({
      valid: true,
      input: "1234-12-12",
      parsed,
      error: null,
    });

    expect(validator("")).toEqual({
      valid: false,
      input: "",
      parsed: null,
      error: 'Not a yyyy-mm-dd date: ""',
    });
  });
});
