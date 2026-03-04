import { isInteger, isNaturalNumber } from "./numbers";
import { validates } from "../testing/cases";

describe("isInteger", () => {
  validates(
    isInteger,
    [
      {
        input: -1,
        parsed: -1,
      },
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
      {
        input: NaN,
        error: 'Not a number: "NaN"',
      },
      {
        input: Infinity,
        error: 'Not a number: "Infinity"',
      },
      {
        input: 0.5,
        error: "Not an integer: 0.5",
      },
    ],
  );
});

describe("isNaturalNumber", () => {
  validates(
    isNaturalNumber,
    [
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
      {
        input: NaN,
        error: 'Not a number: "NaN"',
      },
      {
        input: Infinity,
        error: 'Not a number: "Infinity"',
      },
      {
        input: 0.5,
        error: "Not an integer: 0.5",
      },
      {
        input: -1,
        error: "Not a natural number: -1",
      },
      {
        input: 0,
        error: "Not a natural number: 0",
      },
    ],
  );
});
