import { isNumber } from "../validators/primitives";
import { validateAll, validateEach } from "./arrays";

describe("validateEach", () => {
  it("validates an array of inputs individually", () => {
    expect(validateEach(isNumber)([1, "2"])).toEqual([
      {
        valid: true,
        input: 1,
        parsed: 1,
        error: null,
      },
      {
        valid: false,
        input: "2",
        parsed: null,
        error: 'Not a number: "2"',
      },
    ]);

    expect(validateEach(isNumber)({})).toEqual([
      {
        valid: false,
        input: {},
        parsed: null,
        error: "Not an array: {}",
      },
    ]);
  });
});

describe("validateAll", () => {
  it("validates an array of inputs", () => {
    expect(validateAll(isNumber)([1, 2, 3])).toEqual({
      valid: true,
      input: [1, 2, 3],
      parsed: [1, 2, 3],
      error: null,
    });

    expect(validateAll(isNumber)(["1", 2, "3"])).toEqual({
      valid: false,
      input: ["1", 2, "3"],
      parsed: null,
      error: ['Not a number: "1"', 'Not a number: "3"'],
    });

    expect(validateAll(isNumber)({})).toEqual({
      valid: false,
      input: {},
      parsed: null,
      error: "Not an array: {}",
    });
  });
});
