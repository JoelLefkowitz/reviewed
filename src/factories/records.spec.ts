import { isMapping, validateWith, validateWithAtLeast } from "./records";
import { isNaturalNumberString, isNumberString } from "../validators/strings";
import { isNumber, isString } from "../validators/primitives";
import { optional } from "./transform";

describe("validateWith", () => {
  it("validates an input's fields with validators", () => {
    expect(
      validateWith({
        a: isNumber,
        b: isNumberString,
      }),
    ).toValidateAs({ a: 1, b: "2" }, { a: 1, b: 2 });

    expect(
      validateWith({
        a: isNumber,
        b: isString,
      }),
    ).toInvalidateWith("", 'Not a record: ""');

    expect(
      validateWith({
        a: isNumber,
        b: isString,
      }),
    ).toInvalidateWith({ a: 1, b: 2 }, { b: "Not a string: 2" });
  });

  it("requires exactly the specified fields", () => {
    expect(
      validateWith({
        a: isNumber,
        b: isString,
      }),
    ).toInvalidateWith({ a: 1 }, "Missing required fields: b");

    expect(
      validateWith({
        a: isNumber,
        b: isString,
      }),
    ).toInvalidateWith({ a: 1, b: "2", c: null }, "Unexpected extra fields: c");
  });

  it("parses optional fields", () => {
    const validator = validateWith<{ a: string; b?: number }>({
      a: isString,
      b: optional(isNaturalNumberString),
    });

    expect(validator).toValidateAs({ a: "1" }, { a: "1" });
    expect(
      Object.keys(
        validator({
          a: "1",
        }).parsed,
      ),
    ).toEqual(["a"]);

    expect(validator).toValidateAs({ a: "1", b: undefined }, { a: "1" });
    expect(
      Object.keys(
        validator({
          a: "1",
          b: undefined,
        }).parsed,
      ),
    ).toEqual(["a"]);

    expect(validator).toInvalidateWith(
      { a: "1", b: 2 },
      { b: "Not a string: 2" },
    );

    expect(validator).toValidateAs({ a: "1", b: "2" }, { a: "1", b: 2 });
  });
});

describe("validateWithAtLeast", () => {
  it("validates an input's fields with validators", () => {
    expect(
      validateWithAtLeast({
        a: isNumber,
        b: isString,
      }),
    ).toValidateAs({ a: 1, b: "2" }, { a: 1, b: "2" });

    expect(
      validateWithAtLeast({
        a: isNumber,
        b: isString,
      }),
    ).toInvalidateWith("", 'Not a record: ""');

    expect(
      validateWithAtLeast({
        a: isNumber,
        b: isString,
      }),
    ).toInvalidateWith({ a: 1, b: 2 }, { b: "Not a string: 2" });
  });

  it("allows extra fields", () => {
    expect(
      validateWithAtLeast({
        a: isNumber,
        b: isString,
      }),
    ).toInvalidateWith({ a: 1 }, "Missing required fields: b");

    expect(
      validateWithAtLeast({
        a: isNumber,
        b: isString,
      }),
    ).toValidateAs({ a: 1, b: "2", c: null }, { a: 1, b: "2", c: null });
  });

  it("parses optional fields", () => {
    const validator = validateWithAtLeast<{ a: string; b?: number }>({
      a: isString,
      b: optional(isNaturalNumberString),
    });

    expect(validator).toValidateAs({ a: "1" }, { a: "1" });
    expect(
      Object.keys(
        validator({
          a: "1",
        }).parsed,
      ),
    ).toEqual(["a"]);

    expect(validator).toValidateAs({ a: "1", b: undefined }, { a: "1" });
    expect(
      Object.keys(
        validator({
          a: "1",
          b: undefined,
        }).parsed,
      ),
    ).toEqual(["a"]);

    expect(validator).toInvalidateWith(
      { a: "1", b: 2 },
      { b: "Not a string: 2" },
    );

    expect(validator).toValidateAs({ a: "1", b: "2" }, { a: "1", b: 2 });
  });
});

describe("isMapping", () => {
  expect(isMapping(isString)).toValidate({ a: "1", b: "2" });
  expect(isMapping(isString)).toInvalidate({ a: "1", b: 2 });
});
