import {
  isBooleanString,
  isIntegerString,
  isNaturalNumberString,
  isNumberString,
} from "./strings";
import { suite } from "../testing/suite";

suite(
  isBooleanString,
  [
    { input: "true", parsed: true },
    { input: "false", parsed: false },
  ],
  {
    "Not a string": [undefined, null, true, 1, [], {}],
    "Not a boolean": ["", "1", "a"],
  },
);

suite(
  isNumberString,
  [
    { input: "-1", parsed: -1 },
    { input: "0", parsed: 0 },
    { input: "0.5", parsed: 0.5 },
    { input: "1", parsed: 1 },
  ],
  {
    "Not a string": [undefined, null, true, 1, [], {}],
    "Not a number": ["", "true", "a", "NaN", "Infinity"],
  },
);

suite(
  isIntegerString,
  [
    { input: "-1", parsed: -1 },
    { input: "0", parsed: 0 },
    { input: "1", parsed: 1 },
  ],
  {
    "Not a string": [undefined, null, true, 1, [], {}],
    "Not a number": ["", "true", "a", "NaN", "Infinity"],
    "Not an integer": ["0.5"],
  },
);

suite(isNaturalNumberString, [{ input: "1", parsed: 1 }], {
  "Not a string": [undefined, null, true, 1, [], {}],
  "Not a number": ["", "true", "a", "NaN", "Infinity"],
  "Not an integer": ["0.5"],
  "Not a natural number": ["0", "-1"],
});
