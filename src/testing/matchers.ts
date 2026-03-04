import { Validator } from "../models/validators";
import {
  didNotInvalidate,
  didNotInvalidateWith,
  didNotValidate,
  didNotValidateAs,
} from "./messages";
import { shallowEqual } from "../internal/records";

/**
 * Assert that a validator passes a given input
 *
 * @category Testing
 * @example
 *   expect(isNaturalNumberString).toValidate("1");
 *
 * @param input - The raw input
 */
export const toValidate = <T>(validator: Validator<T>, input: unknown) => {
  const { valid, error } = validator(input);
  return {
    pass: valid,
    message: () => didNotValidate(input, error),
  };
};

/**
 * Assert that a validator passes a given input with an expected parsed output
 *
 * @category Testing
 * @example
 *   expect(isNaturalNumberString).toValidateAs("1", 1);
 *
 * @param input - The raw input
 */
export const toValidateAs = <T>(
  validator: Validator<T>,
  input: unknown,
  expected: unknown,
) => {
  const { valid, parsed, error } = validator(input);
  return {
    pass: valid && shallowEqual(parsed, expected),
    message: () =>
      valid
        ? didNotValidateAs(input, expected, parsed)
        : didNotValidate(input, error),
  };
};

/**
 * Assert that a validator fails a given input
 *
 * @category Testing
 * @example
 *   expect(isNaturalNumberString).toInvalidate({});
 *
 * @param input - The raw input
 */
export const toInvalidate = <T>(validator: Validator<T>, input: unknown) => {
  const { valid } = validator(input);
  return {
    pass: !valid,
    message: () => didNotInvalidate(input),
  };
};

/**
 * Assert that a validator fails a given input with an expected reason
 *
 * @category Testing
 * @example
 *   expect(isNaturalNumberString).toInvalidateWith({}, "Not a string");
 *
 * @param input - The raw input
 */
export const toInvalidateWith = <T>(
  validator: Validator<T>,
  input: unknown,
  expected: string,
) => {
  const { valid, error } = validator(input);
  return {
    pass: !valid && shallowEqual(error, expected),
    message: () =>
      valid
        ? didNotInvalidate(input)
        : didNotInvalidateWith(input, expected, error),
  };
};
