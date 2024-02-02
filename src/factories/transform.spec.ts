import { isNull } from "../validators/primitives";
import { not } from "./transform";

describe("not", () => {
  it("inverts a validator", () => {
    const isNotNull = not(isNull, "Not (not null)");
    expect(isNotNull("").valid).toBe(true);
    expect(isNotNull("").parsed).toBe("");

    expect(isNotNull(null).valid).toBe(false);
    expect(isNotNull(null).error).toBe("Not (not null): null");
  });
});
