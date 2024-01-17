import {
  isBoolean,
  isNull,
  isNumber,
  isObject,
  isString,
  isUndefined,
} from "./primitives";
import { suite } from "../testing/suite";

suite(isUndefined, [{ input: undefined, parsed: undefined }], {
  "Not undefined": [null, true, 1, "", "a", [], {}],
});

suite(isNull, [{ input: null, parsed: null }], {
  "Not null": [undefined, true, 1, "", "a", [], {}],
});

suite(
  isBoolean,
  [
    { input: true, parsed: true },
    { input: false, parsed: false },
  ],
  {
    "Not a boolean": [undefined, null, 1, "", "a", [], {}],
  },
);

suite(
  isNumber,
  [
    { input: 0, parsed: 0 },
    { input: 1, parsed: 1 },
  ],
  {
    "Not a number": [undefined, null, true, NaN, Infinity, "", "a", [], {}],
  },
);

suite(
  isString,
  [
    { input: "", parsed: "" },
    { input: "a", parsed: "a" },
  ],
  {
    "Not a string": [undefined, null, true, 1, [], {}],
  },
);

suite(
  isObject,
  [
    { input: [], parsed: [] },
    { input: { a: 1 }, parsed: { a: 1 } },
  ],
  {
    "Not an object": [undefined, null, true, 1, NaN, Infinity],
  },
);
