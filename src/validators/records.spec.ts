import { isNonEmptyRecord, isRecord } from "./records";
import { validates } from "../testing/cases";

describe("isRecord", () => {
  validates(
    isRecord,
    [
      {
        input: {},
        parsed: {},
      },
      {
        input: { a: 1 },
        parsed: { a: 1 },
      },
      {
        input: { a: "a" },
        parsed: { a: "a" },
      },
      {
        input: { 1: "a" },
        parsed: { 1: "a" },
      },
    ],
    [
      {
        input: undefined,
        error: 'Not a record: "undefined"',
      },
      {
        input: null,
        error: "Not a record: null",
      },
      {
        input: true,
        error: "Not a record: true",
      },
      {
        input: 1,
        error: "Not a record: 1",
      },
      {
        input: "a",
        error: 'Not a record: "a"',
      },
      {
        input: [],
        error: "Not a record: []",
      },
    ],
  );
});

describe("isNonEmptyRecord", () => {
  validates(
    isNonEmptyRecord,
    [
      {
        input: { a: 1 },
        parsed: { a: 1 },
      },
      {
        input: { a: "a" },
        parsed: { a: "a" },
      },
      {
        input: { 1: "a" },
        parsed: { 1: "a" },
      },
    ],
    [
      {
        input: undefined,
        error: 'Not a record: "undefined"',
      },
      {
        input: null,
        error: "Not a record: null",
      },
      {
        input: true,
        error: "Not a record: true",
      },
      {
        input: 1,
        error: "Not a record: 1",
      },
      {
        input: "a",
        error: 'Not a record: "a"',
      },
      {
        input: [],
        error: "Not a record: []",
      },
      {
        input: {},
        error: "Not a non empty record: {}",
      },
    ],
  );
});
