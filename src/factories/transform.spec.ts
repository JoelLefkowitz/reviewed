import { both, either, not } from "./transform";
import { isNonEmptyArray, isStringArray } from "../validators/arrays";
import { isNull, isString } from "../validators/primitives";

describe("not", () => {
  it("inverts a validator", () => {
    const isNotNull = not(isNull);

    expect(isNotNull("").valid).toBe(true);
    expect(isNotNull("").parsed).toBe("");

    expect(isNotNull(null).valid).toBe(false);
    expect(isNotNull(null).error).toBe("Not Invalid: null");
  });

  it("inverts a validator with a failure message", () => {
    const isNotNull = not(isNull, "Is null");

    expect(isNotNull(null).valid).toBe(false);
    expect(isNotNull(null).error).toBe("Is null: null");
  });
});

describe("both", () => {
  it("combines two validators with a logical AND", () => {
    const isNonEmptyStringArray = both(isNonEmptyArray, isStringArray);

    expect(isNonEmptyStringArray([""]).valid).toBe(true);
    expect(isNonEmptyStringArray([""]).parsed).toEqual([""]);

    expect(isNonEmptyStringArray([]).valid).toBe(false);
    expect(isNonEmptyStringArray([]).error).toBe("Not a non empty array: []");

    expect(isNonEmptyStringArray([1]).valid).toBe(false);
    expect(isNonEmptyStringArray([1]).error).toBe(
      "Not an array of strings: [1]",
    );
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
    expect(isStringOrNull(1).error).toBe("Not a string: 1");
  });
});
