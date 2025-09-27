import { serialize } from "./strings";

describe("serialize", () => {
  it("serializes undefined, NaN and Infinity to strings", () => {
    expect(serialize(undefined)).toBe('"undefined"');
    expect(serialize(NaN)).toBe('"NaN"');
    expect(serialize(Infinity)).toBe('"Infinity"');
    expect(serialize(-Infinity)).toBe('"-Infinity"');
  });

  it("adds spacing to collections", () => {
    expect(serialize([1, 2, 3])).toBe("[1, 2, 3]");
    expect(serialize({ a: 1, b: 2 })).toBe('{"a": 1, "b": 2}');
  });

  it("handles circular structures", () => {
    const circular: Record<string, unknown> = {
      a: 1,
    };

    circular.b = circular;
    expect(serialize(circular)).toBe('{"a": 1, "b": "[Circular ~]"}');
  });
});
