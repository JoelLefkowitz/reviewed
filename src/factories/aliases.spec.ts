import { isArrayOf, isRecordOf } from "./aliases";
import { isString } from "../validators/primitives";

describe("aliases", () => {
  it("validates an array of inputs individually", () => {
    const isArrayOfNames = isArrayOf(isRecordOf({ name: isString }));

    expect(isArrayOfNames([]).valid).toBe(true);
    expect(isArrayOfNames([{ name: "a" }, { name: "b" }]).valid).toBe(true);

    expect(isArrayOfNames({}).valid).toBe(false);
    expect(isArrayOfNames({ name: "a" }).valid).toBe(false);
    expect(isArrayOfNames([{ name: "a" }, {}]).valid).toBe(false);
  });
});
