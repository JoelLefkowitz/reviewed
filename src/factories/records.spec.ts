import { isMapping, validateWith, validateWithAtLeast } from "./records";
import { isNumber } from "../validators/primitives";
import { optional } from "../services/transformers";

describe("validateWith", () => {
  const validator = validateWith({
    a: isNumber,
  });

  it("validates an input's fields with validators", () => {
    expect(validator).toValidate({ a: 1 });
    expect(validator).toInvalidateWith(null, "Not a record: null");
    expect(validator).toInvalidateWith({}, "Missing required fields: a");
    expect(validator).toInvalidateWith({ a: "1" }, { a: 'Not a number: "1"' });
  });

  it("doesn't allow extra fields", () => {
    expect(validator).toInvalidateWith(
      { a: 1, b: 2 },
      "Unexpected extra fields: b",
    );
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
  });

  it("allows extra fields", () => {
    const validator = validateWithAtLeast({
      a: isNumber,
    });

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
