import { Validated, Validator } from "../models/Validated.model";
import { invalidate, validate } from "../factories/validate";

export const validated = <T>(arr: Validated<T>[]): T[] =>
  arr.reduce<T[]>(
    (acc, { valid, parsed }) => (valid ? acc.concat(parsed) : acc),
    [],
  );

export const validatedWith = <T>(
  validator: Validator<T>,
  input: unknown,
): T[] => (Array.isArray(input) ? validated(input.map(validator)) : []);

export const errors = (arr: Validated<unknown>[]): string[] =>
  arr.reduce<string[]>((acc, x) => (x.valid ? acc : acc.concat(x.error)), []);

export const merge = <T>(input: Validated<T>[]): Validated<T[]> => {
  const { valid, inputs } = input.reduce<{ inputs: unknown[]; valid: boolean }>(
    (acc, x) => ({
      valid: acc.valid && x.valid,
      inputs: acc.inputs.concat(x.input),
    }),
    { valid: true, inputs: [] },
  );

  return valid
    ? validate(inputs, validated(input))
    : invalidate(inputs, `[${errors(input).join(", ")}]`);
};
