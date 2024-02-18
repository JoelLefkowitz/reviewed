import { isNonEmptyRecord, isRecord } from "./records";
import { suite } from "../testing/suites";

suite(
  isRecord,
  [
    { input: {}, parsed: {} },
    { input: { a: 1 }, parsed: { a: 1 } },
    { input: { a: "a" }, parsed: { a: "a" } },
    { input: { 1: "a" }, parsed: { 1: "a" } },
  ],
  {
    "Not a record": [undefined, null, true, 1, "a", []],
  },
);

suite(
  isNonEmptyRecord,
  [
    { input: { a: 1 }, parsed: { a: 1 } },
    { input: { a: "a" }, parsed: { a: "a" } },
    { input: { 1: "a" }, parsed: { 1: "a" } },
  ],
  {
    "Not a record": [undefined, null, true, 1, "a", []],
    "Not a non empty record": [{}],
  },
);
