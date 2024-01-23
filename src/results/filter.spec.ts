import { isNumber } from "../validators/primitives";
import {
  pickValidated,
  pickValidatedOr,
  selectValidated,
  validatedOr,
} from "./filter";

describe("validatedOr", () => {
  it("takes a  an array of validation results", () => {
    expect(validatedOr(isNumber(1), 2)).toEqual(1);
    expect(validatedOr(isNumber("1"), 2)).toEqual(2);
  });
});

describe("pickValidated", () => {
  it("filters an array of validation results", () => {
    expect(pickValidated(["1", 2, "3"].map(isNumber))).toEqual([2]);
  });
});

describe("pickValidatedOr", () => {
  it("picks parsed results or a fallback from an array of validation results", () => {
    expect(pickValidatedOr(["1", 2, "3"].map(isNumber), 4)).toEqual([4, 2, 4]);
  });
});

describe("selectValidated", () => {
  it("selects parsed results from validated fields", () => {
    expect(
      selectValidated({
        a: isNumber("1"),
        b: isNumber(2),
      }),
    ).toEqual({ b: 2 });
  });
});
