import {
  filterValidated,
  filterValidatedOr,
  pickValidated,
  validatedOr,
} from "./filter";
import { isNumber } from "../validators/primitives";
import { mapRecord } from "../services/records";

describe("validatedOr", () => {
  it("validates and returns an input or a fallback", () => {
    expect(validatedOr(isNumber(1), 0)).toEqual(1);
    expect(validatedOr(isNumber("1"), 0)).toEqual(0);
  });
});

describe("filterValidated", () => {
  it("filters an array of validated results", () => {
    expect(filterValidated(["1", 2, "3"].map(isNumber))).toEqual([2]);
  });
});

describe("filterValidatedOr", () => {
  it("filters parsed results with a fallback from an array of validated results", () => {
    expect(filterValidatedOr(["1", 2, "3"].map(isNumber), 0)).toEqual([
      0, 2, 0,
    ]);
  });
});

describe("pickValidated", () => {
  it("selects parsed results from validated fields", () => {
    expect(
      pickValidated(mapRecord(isNumber, { a: "1", b: 2, c: "3" })),
    ).toEqual({ b: 2 });
  });
});
