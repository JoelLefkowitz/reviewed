import { isMapping, validateWith, validateWithAtLeast } from "./records";
import { isNumber } from "../validators/primitives";
import { optional } from "../services/transformers";

describe("validateWith", () => {
  it("validates an input's fields with validators", () => {
    const validator = validateWith({
      a: isNumber,
    });

    expect(validator).toValidate({ a: 1 });
    expect(validator).toInvalidateWith(null, "Not a record: null");
    expect(validator).toInvalidateWith({}, "Missing required fields: a");
    expect(validator).toInvalidateWith({ a: "1" }, { a: 'Not a number: "1"' });
    expect(validator).toInvalidateWith(
      { a: 1, b: 2 },
      "Unexpected extra fields: b",
    );
  });

  it("parses optional fields", () => {
    const validator = validateWith({
      a: optional(isNumber),
    });

    expect(validator).toValidate({ a: undefined });
    expect(validator).toValidate({});
  });
});

describe("validateWithAtLeast", () => {
  it("validates an input's fields with validators", () => {
    const validator = validateWithAtLeast({
      a: isNumber,
    });

    expect(validator).toValidate({ a: 1 });
    expect(validator).toInvalidateWith(null, "Not a record: null");
    expect(validator).toInvalidateWith({}, "Missing required fields: a");
    expect(validator).toInvalidateWith({ a: "1" }, { a: 'Not a number: "1"' });
    expect(validator).toValidate({ a: 1, b: 2 });
  });

  it("parses optional fields", () => {
    const validator = validateWithAtLeast({
      a: optional(isNumber),
    });

    expect(validator).toValidate({ a: undefined });
    expect(validator).toValidate({});
  });
});

describe("isMapping", () => {
  const validator = isMapping(isNumber);

  it("validates a record with string keys", () => {
    expect(validator).toValidate({ a: 1, b: 2 });
    expect(validator).toInvalidateWith(null, "Not a record: null");
    expect(validator).toInvalidateWith(
      { a: 1, b: "2" },
      { b: 'Not a number: "2"' },
    );
  });
});
