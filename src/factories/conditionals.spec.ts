import { validateIf } from "./conditionals";

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
