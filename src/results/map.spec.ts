import { isNonEmptyArray, isNumberArray } from "../validators/arrays";
import { isNumber, isString } from "../validators/primitives";
import { mapValidated } from "./map";

describe("mapValidated", () => {
  it("chains a validator to a validated result", () => {
    expect(
      mapValidated(isNonEmptyArray([1, 2, 3]), isNumberArray).parsed,
    ).toEqual([1, 2, 3]);

    expect(mapValidated(isString(1), isNumber).error).toBe("Not a string: 1");
    expect(mapValidated(isNumber(1), isString).error).toBe("Not a string: 1");
  });
});
