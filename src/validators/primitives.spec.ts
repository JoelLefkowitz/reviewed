import {
  isBoolean,
  isNull,
  isNumber,
  isObject,
  isString,
  isUndefined,
} from "./primitives";
import { suite } from "../services/suite";

suite({
  name: "isUndefined",
  validator: isUndefined,
  valid: [[undefined, undefined]],
  invalid: {
    "Not undefined": [null, true, 1, "", "a", [], {}],
  },
});

suite({
  name: "isNull",
  validator: isNull,
  valid: [[null, null]],
  invalid: {
    "Not null": [undefined, true, 1, "", "a", [], {}],
  },
});

suite({
  name: "isBoolean",
  validator: isBoolean,
  valid: [
    [true, true],
    [false, false],
  ],
  invalid: {
    "Not a boolean": [undefined, null, 1, "", "a", [], {}],
  },
});

suite({
  name: "isNumber",
  validator: isNumber,
  valid: [
    [0, 0],
    [1, 1],
  ],
  invalid: {
    "Not a number": [undefined, null, true, NaN, Infinity, "", "a", [], {}],
  },
});

suite({
  name: "isString",
  validator: isString,
  valid: [
    ["", ""],
    ["a", "a"],
  ],
  invalid: {
    "Not a string": [undefined, null, true, 1, [], {}],
  },
});

suite({
  name: "isObject",
  validator: isObject,
  valid: [
    [[], []],
    [{ a: 1 }, { a: 1 }],
  ],
  invalid: {
    "Not an object": [undefined, null, true, 1, NaN, Infinity],
  },
});
