import { isRecord } from "./objects";
import { suite } from "../services/suite";

suite({
  name: "isRecord",
  validator: isRecord,
  valid: [
    [{}, {}],
    [{ a: 1 }, { a: 1 }],
    [{ a: "a" }, { a: "a" }],
    [{ 1: "a" }, { 1: "a" }],
  ],
  invalid: {
    "Not a record": [undefined, null, true, 1, "a", []],
  },
});
