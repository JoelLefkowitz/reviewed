import {
  filterValidated,
  filterValidatedOr,
  pickValidated,
  validatedOr,
} from "./filter";
import { isNumber } from "../validators/primitives";

describe("validatedOr", () => {
  it("takes a  an array of validation results", () => {
    expect(validatedOr(isNumber(1), 2)).toEqual(1);
    expect(validatedOr(isNumber("1"), 2)).toEqual(2);
  });
});

describe("filterValidated", () => {
  it("filters an array of validation results", () => {
    expect(filterValidated(["1", 2, "3"].map(isNumber))).toEqual([2]);
  });
});

describe("filterValidatedOr", () => {
  it("filters parsed results or a fallback from an array of validation results", () => {
    expect(filterValidatedOr(["1", 2, "3"].map(isNumber), 4)).toEqual([
      4, 2, 4,
    ]);
  });
});

describe("pickValidated", () => {
  it("selects parsed results from validated fields", () => {
    expect(
      pickValidated({
        a: isNumber("1"),
        b: isNumber(2),
      })
    ).toEqual({ b: 2 });
  });
});
