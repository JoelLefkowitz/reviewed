import { Validator } from "../models/Validated.model";
import { validateIf } from "../factories/validate";

export const isUndefined: Validator<undefined> = (input: unknown) =>
  validateIf(input === undefined, "Not undefined", input);

export const isNull: Validator<null> = (input: unknown) =>
  validateIf(input === null, "Not null", input);

export const isBoolean: Validator<boolean> = (input: unknown) =>
  validateIf(typeof input === "boolean", "Not a boolean", input);

export const isNumber: Validator<number> = (input: unknown) =>
  validateIf(
    typeof input === "number" && isFinite(input),
    "Not a number",
    input,
  );

export const isString: Validator<string> = (input: unknown) =>
  validateIf(typeof input === "string", "Not a string", input);

export const isObject: Validator<object> = (input: unknown) =>
  validateIf(
    typeof input === "object" && input !== null,
    "Not an object",
    input,
  );
