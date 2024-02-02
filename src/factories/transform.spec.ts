import { either, not } from "./transform";
import { isNull, isString } from "../validators/primitives";

describe("not", () => {
  it("inverts a validator", () => {
    const isNotNull = not(isNull, "Not (not null)");
    expect(isNotNull("").valid).toBe(true);
    expect(isNotNull("").parsed).toBe("");

    expect(isNotNull(null).valid).toBe(false);
    expect(isNotNull(null).error).toBe("Not (not null): null");
  });
});

describe("either", () => {
  it("combines two validators with a logical OR", () => {
    const isStringOrNull = either(isString, isNull);

    expect(isStringOrNull("").valid).toBe(true);
    expect(isStringOrNull("").parsed).toBe("");

    expect(isStringOrNull(null).valid).toBe(true);
    expect(isStringOrNull(null).parsed).toBe(null);

    expect(isStringOrNull(1).valid).toBe(false);
    expect(isStringOrNull(1).error).toEqual(["Not a string: 1", "Not null: 1"]);
  });
});
