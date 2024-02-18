import { invalidate, invalidateWith } from "./invalidate";

describe("invalidate", () => {
  it("wraps an invalid object", () => {
    expect(invalidate<number>("", "error")).toEqual({
      valid: false,
      input: "",
      parsed: null,
      error: "error",
    });
  });
});

describe("invalidateWith", () => {
  it("invalidates an object with a failure message", () => {
    expect(invalidateWith<number>("Not a number")("")).toEqual({
      valid: false,
      input: "",
      parsed: null,
      error: 'Not a number: ""',
    });
  });
});
