import { asserts, both, chain, either, not, optional } from "./transformers";
import { isNaturalNumberString } from "../validators/strings";
import { isNonEmptyArray, isOneOf, isStringArray } from "../validators/arrays";
import { isNull, isNumber, isString } from "../validators/primitives";

describe("asserts", () => {
  const assertor = asserts(isNumber);

  it("augments a validator to throw an error on failure", () => {
    expect(assertor(1)).toBe(1);
    expect(() => assertor(null)).toThrow("Not a number: null");
  });
});

describe("not", () => {
  it("inverts a validator", () => {
    const isNotNull = not(isNull);

    expect(isNotNull).toValidate("");
    expect(isNotNull).toInvalidateWith(null, "Not Invalid: null");
  });

  it("inverts a validator with a failure message", () => {
    const isNotNull = not(isNull, "Is null");

    expect(isNotNull).toInvalidateWith(null, "Is null: null");
  });
});

describe("both", () => {
  it("combines two validators with a logical AND", () => {
    const isNonEmptyStringArray = both(isNonEmptyArray, isStringArray);

    expect(isNonEmptyStringArray).toValidate([""]);

    expect(isNonEmptyStringArray).toInvalidateWith(
      [],
      "Not a non empty array: []",
    );

    expect(isNonEmptyStringArray).toInvalidateWith(
      [1],
      "Not an array of strings: [1]",
    );
  });
});

describe("either", () => {
  it("combines two validators with a logical OR", () => {
    const isStringOrNull = either(isString, isNull);

    expect(isStringOrNull).toValidate("");
    expect(isStringOrNull).toValidate(null);
    expect(isStringOrNull).toInvalidateWith(1, "Not a string: 1");
  });
});

describe("optional", () => {
  it("allows a validator to accept undefined inputs", () => {
    const validator = optional(isNaturalNumberString);

    expect(validator).toInvalidateWith(1, "Not a string: 1");
    expect(validator).toValidateAs("1", 1);
    expect(validator).toValidateAs(undefined, undefined);
  });
});

describe("chain", () => {
  it("combines validators sequentially", () => {
    const validator = chain(isOneOf([1, 2]), isOneOf([2, 3]));

    expect(validator).toValidate(2);
    expect(validator).toInvalidateWith(1, "Not one of [2, 3]: 1");
    expect(validator).toInvalidateWith(3, "Not one of [1, 2]: 3");
  });
});
