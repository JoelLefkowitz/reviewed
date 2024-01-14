import { Validated } from "../models/Validated.model";

export const validate = <T>(
  input: unknown,
  parsed: unknown = input,
): Validated<T> => ({
  valid: true,
  input,
  parsed: parsed as T,
  error: null,
});

export const invalidate = <T>(
  input: unknown,
  reason: string,
): Validated<T> => ({
  valid: false,
  input,
  parsed: null,
  error: reason.concat(
    ": ",
    JSON.stringify(input, (_, token: unknown) =>
      typeof token === "number" &&
      (isNaN(token) || [Infinity, -Infinity].includes(token))
        ? token.toString()
        : token,
    ),
  ),
});

export const validateIf = <T>(
  condition: boolean,
  reason: string,
  input: unknown,
  parsed: unknown = input,
): Validated<T> =>
  condition ? validate(input, parsed) : invalidate(input, reason);
