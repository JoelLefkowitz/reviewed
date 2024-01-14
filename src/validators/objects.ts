import {Validator} from "../models/Validated.model";
import {isObject} from "./primitives";
import {validateIf} from "../factories/validate";

export const isRecord: Validator<Record<string | number | symbol, unknown>> = (
  input: unknown
) =>
  validateIf(
    isObject(input).valid && !Array.isArray(input),
    "Not a record",
    input
  );
