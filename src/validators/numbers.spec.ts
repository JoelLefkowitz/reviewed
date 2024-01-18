import { isInteger, isNaturalNumber } from "./numbers";
import { suite } from "../testing/suite";

suite(
  isInteger,
  [
    { input: -1, parsed: -1 },
    { input: 0, parsed: 0 },
    { input: 1, parsed: 1 },
  ],
  {
    "Not a number": [undefined, null, true, "", "a", [], {}, NaN, Infinity],
    "Not an integer": [0.5],
  },
);

suite(isNaturalNumber, [{ input: 1, parsed: 1 }], {
  "Not a number": [undefined, null, true, "", "a", [], {}, NaN, Infinity],
  "Not an integer": [0.5],
  "Not a natural number": [-1, 0],
});
