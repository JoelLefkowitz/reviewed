import {
  isBooleanString,
  isIntegerString,
  isNaturalNumberString,
  isNumberString,
} from "./strings";
import { suite } from "../services/suite";

suite({
  name: "isBooleanString",
  validator: isBooleanString,
  valid: [
    ["true", true],
    ["false", false],
  ],
  invalid: {
    "Not a string": [undefined, null, true, 1, [], {}],
    "Not a boolean": ["", "1", "a"],
  },
});

suite({
  name: "isNumberString",
  validator: isNumberString,
  valid: [
    ["-1", -1],
    ["0", 0],
    ["0.5", 0.5],
    ["1", 1],
  ],
  invalid: {
    "Not a string": [undefined, null, true, 1, [], {}],
    "Not a number": ["", "true", "a", "NaN", "Infinity"],
  },
});

suite({
  name: "isIntegerString",
  validator: isIntegerString,
  valid: [
    ["-1", -1],
    ["0", 0],
    ["1", 1],
  ],
  invalid: {
    "Not a string": [undefined, null, true, 1, [], {}],
    "Not a number": ["", "true", "a", "NaN", "Infinity"],
    "Not an integer": ["0.5"],
  },
});

suite({
  name: "isNaturalNumberString",
  validator: isNaturalNumberString,
  valid: [["1", 1]],
  invalid: {
    "Not a string": [undefined, null, true, 1, [], {}],
    "Not a number": ["", "true", "a", "NaN", "Infinity"],
    "Not an integer": ["0.5"],
    "Not a natural number": ["0", "-1"],
  },
});
