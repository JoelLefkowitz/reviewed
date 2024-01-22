import { rejection, serialize } from "./strings";

describe("serialize", () => {
  it("adds spacing to collections", () => {
    expect(serialize([1, 2, 3])).toBe("[1, 2, 3]");
    expect(serialize({ a: 1, b: 2 })).toBe('{"a": 1, "b": 2}');
  });

  it("serializes undefined, NaN and Infinity to strings", () => {
    expect(serialize(undefined)).toBe('"undefined"');
    expect(serialize(NaN)).toBe('"NaN"');
    expect(serialize(Infinity)).toBe('"Infinity"');
    expect(serialize(-Infinity)).toBe('"-Infinity"');
  });
});

describe("rejection", () => {
  it("formats a rejection", () => {
    expect(rejection([1, 2, 3], "Not a number")).toBe(
      "Not a number: [1, 2, 3]",
    );
  });
});
