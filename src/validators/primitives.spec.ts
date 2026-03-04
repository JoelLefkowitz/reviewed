import {
  isBoolean,
  isNull,
  isNumber,
  isObject,
  isString,
  isUndefined,
} from "./primitives";
import { validates } from "../testing/cases";

describe("isUndefined", () => {
  validates(
    isUndefined,
    [
      {
        input: undefined,
        parsed: undefined,
      },
    ],
    [
      {
        input: null,
        error: "Not undefined: null",
      },
      {
        input: true,
        error: "Not undefined: true",
      },
      {
        input: 1,
        error: "Not undefined: 1",
      },
      {
        input: "",
        error: 'Not undefined: ""',
      },
      {
        input: "a",
        error: 'Not undefined: "a"',
      },
      {
        input: [],
        error: "Not undefined: []",
      },
      {
        input: {},
        error: "Not undefined: {}",
      },
    ],
  );
});

describe("isNull", () => {
  validates(
    isNull,
    [
      {
        input: null,
        parsed: null,
      },
    ],
    [
      {
        input: undefined,
        error: 'Not null: "undefined"',
      },
      {
        input: true,
        error: "Not null: true",
      },
      {
        input: 1,
        error: "Not null: 1",
      },
      {
        input: "",
        error: 'Not null: ""',
      },
      {
        input: "a",
        error: 'Not null: "a"',
      },
      {
        input: [],
        error: "Not null: []",
      },
      {
        input: {},
        error: "Not null: {}",
      },
    ],
  );
});

describe("isBoolean", () => {
  validates(
    isBoolean,
    [
      {
        input: true,
        parsed: true,
      },
      {
        input: false,
        parsed: false,
      },
    ],
    [
      {
        input: undefined,
        error: 'Not a boolean: "undefined"',
      },
      {
        input: null,
        error: "Not a boolean: null",
      },
      {
        input: 1,
        error: "Not a boolean: 1",
      },
      {
        input: "",
        error: 'Not a boolean: ""',
      },
      {
        input: "a",
        error: 'Not a boolean: "a"',
      },
      {
        input: [],
        error: "Not a boolean: []",
      },
      {
        input: {},
        error: "Not a boolean: {}",
      },
    ],
  );
});

describe("isNumber", () => {
  validates(
    isNumber,
    [
      {
        input: 0,
        parsed: 0,
      },
      {
        input: 1,
        parsed: 1,
      },
    ],
    [
      {
        input: undefined,
        error: 'Not a number: "undefined"',
      },
      {
        input: null,
        error: "Not a number: null",
      },
      {
        input: true,
        error: "Not a number: true",
      },
      {
        input: NaN,
        error: 'Not a number: "NaN"',
      },
      {
        input: Infinity,
        error: 'Not a number: "Infinity"',
      },
      {
        input: "",
        error: 'Not a number: ""',
      },
      {
        input: "a",
        error: 'Not a number: "a"',
      },
      {
        input: [],
        error: "Not a number: []",
      },
      {
        input: {},
        error: "Not a number: {}",
      },
    ],
  );
});

describe("isString", () => {
  validates(
    isString,
    [
      {
        input: "",
        parsed: "",
      },
      {
        input: "a",
        parsed: "a",
      },
    ],
    [
      {
        input: undefined,
        error: 'Not a string: "undefined"',
      },
      {
        input: null,
        error: "Not a string: null",
      },
      {
        input: true,
        error: "Not a string: true",
      },
      {
        input: 1,
        error: "Not a string: 1",
      },
      {
        input: [],
        error: "Not a string: []",
      },
      {
        input: {},
        error: "Not a string: {}",
      },
    ],
  );
});

describe("isObject", () => {
  validates(
    isObject,
    [
      {
        input: [],
        parsed: [],
      },
      {
        input: { a: 1 },
        parsed: { a: 1 },
      },
    ],
    [
      {
        input: undefined,
        error: 'Not an object: "undefined"',
      },
      {
        input: null,
        error: "Not an object: null",
      },
      {
        input: true,
        error: "Not an object: true",
      },
      {
        input: 1,
        error: "Not an object: 1",
      },
      {
        input: NaN,
        error: 'Not an object: "NaN"',
      },
      {
        input: Infinity,
        error: 'Not an object: "Infinity"',
      },
    ],
  );
});
