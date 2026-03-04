import {
  isBooleanString,
  isIntegerString,
  isJSONString,
  isNaturalNumberString,
  isNumberString,
} from "./strings";
import { validates } from "../testing/cases";

describe("isBooleanString", () => {
  validates(
    isBooleanString,
    [
      {
        input: "true",
        parsed: true,
      },
      {
        input: "false",
        parsed: false,
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

describe("isNumberString", () => {
  validates(
    isNumberString,
    [
      {
        input: "-1",
        parsed: -1,
      },
      {
        input: "0",
        parsed: 0,
      },
      {
        input: "0.5",
        parsed: 0.5,
      },
      {
        input: "1",
        parsed: 1,
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
      {
        input: "",
        error: 'Not a number string: ""',
      },
      {
        input: "true",
        error: 'Not a number string: "true"',
      },
      {
        input: "a",
        error: 'Not a number string: "a"',
      },
      {
        input: "NaN",
        error: 'Not a number string: "NaN"',
      },
      {
        input: "Infinity",
        error: 'Not a number string: "Infinity"',
      },
    ],
  );
});

describe("isIntegerString", () => {
  validates(
    isIntegerString,
    [
      {
        input: "-1",
        parsed: -1,
      },
      {
        input: "0",
        parsed: 0,
      },
      {
        input: "1",
        parsed: 1,
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
      {
        input: "",
        error: 'Not a number string: ""',
      },
      {
        input: "true",
        error: 'Not a number string: "true"',
      },
      {
        input: "a",
        error: 'Not a number string: "a"',
      },
      {
        input: "NaN",
        error: 'Not a number string: "NaN"',
      },
      {
        input: "Infinity",
        error: 'Not a number string: "Infinity"',
      },
      {
        input: "0.5",
        error: 'Not an integer string: "0.5"',
      },
    ],
  );
});

describe("isNaturalNumberString", () => {
  validates(
    isNaturalNumberString,
    [
      {
        input: "1",
        parsed: 1,
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
      {
        input: "",
        error: 'Not a number string: ""',
      },
      {
        input: "true",
        error: 'Not a number string: "true"',
      },
      {
        input: "a",
        error: 'Not a number string: "a"',
      },
      {
        input: "NaN",
        error: 'Not a number string: "NaN"',
      },
      {
        input: "Infinity",
        error: 'Not a number string: "Infinity"',
      },
      {
        input: "0.5",
        error: 'Not an integer string: "0.5"',
      },
      {
        input: "0",
        error: 'Not a natural number string: "0"',
      },
      {
        input: "-1",
        error: 'Not a natural number string: "-1"',
      },
    ],
  );
});

describe("isJSONString", () => {
  validates(
    isJSONString,
    [
      {
        input: '{"a": 1}',
        parsed: { a: 1 },
      },
    ],
    [
      {
        input: null,
        error: "Not a string: null",
      },
      {
        input: "_",
        error: 'Not JSON: "_"',
      },
    ],
  );
});
