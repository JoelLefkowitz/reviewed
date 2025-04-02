import { group } from "./arrays";

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
