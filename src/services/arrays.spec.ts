import { all, any, group } from "./arrays";

describe("all", () => {
  it("checks all an array's elements are true", () => {
    expect(all([])).toBe(true);
    expect(all([true])).toBe(true);
    expect(all([false])).toBe(false);
    expect(all([true, true])).toBe(true);
    expect(all([true, false])).toBe(false);
    expect(all([false, false])).toBe(false);
  });
});

describe("any", () => {
  it("checks any an array's elements are true", () => {
    expect(any([])).toBe(false);
    expect(any([true])).toBe(true);
    expect(any([false])).toBe(false);
    expect(any([true, true])).toBe(true);
    expect(any([true, false])).toBe(true);
    expect(any([false, false])).toBe(false);
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
