import { mapRecord, reduceRecord } from "./records";

describe("mapRecord", () => {
  it("reduces values from an object", () => {
    expect(mapRecord((x) => x * 2, { a: 1, b: 2 })).toEqual({
      a: 2,
      b: 4,
    });
  });
});

describe("reduceRecord", () => {
  it("reduces values from an object", () => {
    expect(
      reduceRecord(
        (x) => x % 2 === 0,
        (x) => x * 2,
        { a: 1, b: 2 },
      ),
    ).toEqual({
      b: 4,
    });
  });
});
