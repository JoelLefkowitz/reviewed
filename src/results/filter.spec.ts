import { errors, validated, validatedWith } from "./filter";
import { isNumber } from "../validators/primitives";

describe("validated", () => {
  it("filters an array of validation results", () => {
    expect(validated(["1", 2, "3"].map(isNumber))).toEqual([2]);
  });
});

describe("validatedWith", () => {
  it("filters an array of with a validator", () => {
    expect(validatedWith(isNumber, ["1", 2, "3"])).toEqual([2]);
  });
});

describe("errors", () => {
  it("filters an array of validation results and collects errors", () => {
    expect(errors(["1", 2, "3"].map(isNumber))).toEqual([
      'Not a number: "1"',
      'Not a number: "3"',
    ]);
  });
});
