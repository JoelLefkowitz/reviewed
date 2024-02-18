import { allPass, anyPass, group } from "./arrays";

describe("allPass", () => {
  it("checks all an array's elements are true", () => {
    expect(allPass([])).toBe(true);
    expect(allPass([true])).toBe(true);
    expect(allPass([false])).toBe(false);
    expect(allPass([true, true])).toBe(true);
    expect(allPass([true, false])).toBe(false);
    expect(allPass([false, false])).toBe(false);
  });
});

describe("anyPass", () => {
  it("checks any an array's elements are true", () => {
    expect(anyPass([])).toBe(false);
    expect(anyPass([true])).toBe(true);
    expect(anyPass([false])).toBe(false);
    expect(anyPass([true, true])).toBe(true);
    expect(anyPass([true, false])).toBe(true);
    expect(anyPass([false, false])).toBe(false);
  });
});

describe("group", () => {
  it("groups objects by key", () => {
    expect(
      group([{ a: 1, b: 2 }, { a: 3, b: 4 }, { a: 5 }, { a: 6, b: 7, c: 8 }]),
    ).toEqual({
      a: [1, 3, 5, 6],
      b: [2, 4, 7],
      c: [8],
    });
  });
});
