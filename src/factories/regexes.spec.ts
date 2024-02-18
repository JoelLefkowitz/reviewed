import { validateRegex } from "./regexes";

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
