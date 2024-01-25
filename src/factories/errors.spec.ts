import { fail } from "./errors";

describe("fail", () => {
  it("constructs a native error message", () => {
    expect(() => {
      throw fail({
        a: "Not a number: null",
      });
    }).toThrow('{"a": "Not a number: null');
  });
});
