import { isNumber } from "../validators/primitives";
import { validated, validatedWith } from "./filter";

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
