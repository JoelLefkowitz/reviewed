import { serialize } from "../services/strings";

/** @internal */
export const didNotValidate = (input: unknown, received: unknown): string =>
  `Expected to validate ${JSON.stringify(input)} but received: ${serialize(received)}`;

/** @internal */
export const didNotInvalidate = (input: unknown): string =>
  `Expected to invalidate ${JSON.stringify(input)} but validated it instead`;

/** @internal */
export const didNotValidateAs = (
  input: unknown,
  expected: unknown,
  received: unknown,
): string =>
  `Expected to validate ${JSON.stringify(input)} as ${JSON.stringify(expected)} but received: ${JSON.stringify(received)}`;

/** @internal */
export const didNotInvalidateWith = (
  input: unknown,
  expected: unknown,
  received: unknown,
): string =>
  `Expected to invalidate ${JSON.stringify(input)} with: ${JSON.stringify(expected)} but invalidated with: ${serialize(received)}`;
