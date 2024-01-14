import { Validated, Validator } from "../models/Validated.model";
import { invalidate, validate } from "../factories/validate";
import { isNumber, isString } from "./primitives";

export const isArray: Validator<unknown[]> = (input: unknown) =>
  Array.isArray(input) ? validate(input) : invalidate(input, "Not an array");

export const isNumberArray: Validator<number[]> = (input: unknown) => {
  const isArrayCheck = isArray(input);

  if (!isArrayCheck.valid) {
    return isArrayCheck;
  }

  return isArrayCheck.parsed.every((i) => isNumber(i).valid)
    ? validate(input, isArrayCheck.parsed)
    : invalidate(input, "Not an array of numbers");
};

export const isStringArray: Validator<string[]> = (input: unknown) => {
  const isArrayCheck = isArray(input);

  if (!isArrayCheck.valid) {
    return isArrayCheck;
  }

  return isArrayCheck.parsed.every((i) => isString(i).valid)
    ? validate(input, isArrayCheck.parsed)
    : invalidate(input, "Not an array of strings");
};

export const isOneOf = <T>(options: T[], input: unknown): Validated<T> =>
  options.includes(input as T)
    ? validate(input as T)
    : invalidate(input, `Not one of ${JSON.stringify(options)}`);

export const isArrayOf = <T>(options: T[], input: unknown): Validated<T> => {
  const isArrayCheck = isArray(input);

  if (!isArrayCheck.valid) {
    return isArrayCheck;
  }

  return isArrayCheck.parsed.some((i) => !options.includes(i as T))
    ? invalidate(input, `Not an array of ${JSON.stringify(options)}`)
    : validate(input as T);
};
