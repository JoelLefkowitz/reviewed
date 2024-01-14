import { Validator } from "../models/Validated.model";
import { invalidate, validate, validateIf } from "../factories/validate";
import { isString } from "./primitives";

export const isBooleanString: Validator<boolean> = (input: unknown) => {
  const isStringCheck = isString(input);

  if (!isStringCheck.valid) {
    return isStringCheck;
  }

  return ["true", "false"].includes(isStringCheck.parsed)
    ? validate(input, isStringCheck.parsed === "true")
    : invalidate(input, "Not a boolean");
};

export const isNumberString: Validator<number> = (input: unknown) => {
  const isStringCheck = isString(input);

  if (!isStringCheck.valid) {
    return isStringCheck;
  }

  const parsed = parseFloat(isStringCheck.parsed);

  return validateIf(isFinite(parsed), "Not a number", input, parsed);
};

export const isIntegerString: Validator<number> = (input: unknown) => {
  const isNumberStringCheck = isNumberString(input);

  if (!isNumberStringCheck.valid) {
    return isNumberStringCheck;
  }

  return validateIf(
    Number.isInteger(isNumberStringCheck.parsed),
    "Not an integer",
    input,
    isNumberStringCheck.parsed,
  );
};

export const isNaturalNumberString: Validator<number> = (input: unknown) => {
  const isIntegerStringCheck = isIntegerString(input);

  if (!isIntegerStringCheck.valid) {
    return isIntegerStringCheck;
  }

  return validateIf(
    isIntegerStringCheck.parsed > 0,
    "Not a natural number",
    input,
    isIntegerStringCheck.parsed,
  );
};
