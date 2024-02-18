import { filterValid } from "./filter";
import { isNumber } from "../validators/primitives";

describe("filterValid", () => {
  it("filters an array of inputs with a validator", () => {
    expect(filterValid(isNumber)("")).toEqual([]);
    expect(filterValid(isNumber)(["1", 2, "3"])).toEqual([2]);
  });
});
