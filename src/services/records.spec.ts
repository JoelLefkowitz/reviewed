import { mapRecord, pickField, reduceRecord } from "./records";

describe("mapRecord", () => {
  it("maps values in an object", () => {
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
        (x) => x * 2,
        (x) => x % 2 === 0,
        { a: 1, b: 2 }
      )
    ).toEqual({
      b: 4,
    });
  });
});

describe("pickField", () => {
  it("picks values from a nested field in an object", () => {
    expect(pickField("x", { a: { x: 1 }, b: { x: 2 } })).toEqual({
      a: 1,
      b: 2,
    });
  });
});
