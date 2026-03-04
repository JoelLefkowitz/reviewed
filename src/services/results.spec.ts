import { all, any, assert, merge, sieve, when } from "./results";
import { invalidate } from "../factories/invalidate";
import { isNumber } from "../validators/primitives";
import { mapRecord } from "../internal/records";

describe("assert", () => {
  it("validates an input and throws an error on failure", () => {
    expect(assert(isNumber, 1)).toBe(1);
    expect(() => assert(isNumber, null)).toThrow("Not a number: null");
  });
});

describe("all", () => {
  it("merges an array of validated results using a logical AND", () => {
    expect(all).toValidate([]);
    expect(all).toValidateAs([1, 2, 3].map(isNumber), [1, 2, 3]);
  });

  it("invalidates only the invalidated results of an array", () => {
    expect(all).toInvalidateWith(["1", 2, "3"].map(isNumber), [
      'Not a number: "1"',
      'Not a number: "3"',
    ]);
  });

  it("collects nested failure messages", () => {
    expect(all).toInvalidateWith(
      [invalidate("", ["a", "b"]), invalidate("", [{ a: "b" }, { c: "d" }])],
      [
        ["a", "b"],
        [{ a: "b" }, { c: "d" }],
      ],
    );
  });
});

describe("any", () => {
  it("merges an array of validated results using a logical OR", () => {
    expect(any).toValidateAs(["1", 2, "3"].map(isNumber), [2]);
  });

  it("invalidates an empty array", () => {
    expect(any).toInvalidateWith([], "Not a non empty array: []");
  });

  it("invalidates an entirely invalidated array", () => {
    expect(any).toInvalidateWith(["1", "2", "3"].map(isNumber), [
      'Not a number: "1"',
      'Not a number: "2"',
      'Not a number: "3"',
    ]);
  });

  it("collects nested failure messages", () => {
    expect(any).toInvalidateWith(
      [invalidate("", ["a", "b"]), invalidate("", [{ a: "b" }, { c: "d" }])],
      [
        ["a", "b"],
        [{ a: "b" }, { c: "d" }],
      ],
    );
  });
});

describe("merge", () => {
  it("merges the validated fields of an object", () => {
    const numbers = {
      a: 1,
      b: 2,
      c: 3,
    };

    expect(merge).toValidateAs(mapRecord(isNumber, numbers), numbers);
  });

  it("invalidates only the invalidated fields of an object", () => {
    expect(merge).toInvalidateWith(
      mapRecord(isNumber, {
        a: "1",
        b: 2,
        c: "3",
      }),
      {
        a: 'Not a number: "1"',
        c: 'Not a number: "3"',
      },
    );
  });
});

describe("sieve", () => {
  it("selects parsed results from validated fields", () => {
    expect(
      sieve(
        mapRecord(isNumber, {
          a: "1",
          b: 2,
          c: "3",
        }),
      ),
    ).toEqual({
      b: 2,
    });
  });
});

describe("when", () => {
  it("calls a callback when validation succeeds", () => {
    const numbers = [];

    const effect = when(isNumber, (x) => {
      numbers.push(x);
    });

    [1, "2", 3].forEach(effect);

    expect(numbers).toEqual([1, 3]);
  });
});
