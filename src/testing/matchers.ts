import { Validator } from "../models/validators";
import {
  didNotInvalidate,
  didNotInvalidateWith,
  didNotValidate,
  didNotValidateAs,
} from "./messages";
import { invalidateWith } from "../factories/invalidate";

/** @internal */
const shallowEqual = (a: unknown, b: unknown) =>
  JSON.stringify(a) === JSON.stringify(b);

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
  return valid && shallowEqual(parsed, expected)
    ? {
        pass: true,
        message: () => "",
      }
    : {
        pass: false,
        message: () =>
          valid
            ? didNotValidateAs(input, expected, parsed)
            : didNotValidate(input, error),
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
  reason: string,
) => {
  const { valid, error } = validator(input);
  const { error: expected } = invalidateWith(reason)(input);
  return !valid && error == expected
    ? {
        pass: true,
        message: () => "",
      }
    : {
        pass: false,
        message: () =>
          valid
            ? didNotInvalidate(input)
            : didNotInvalidateWith(input, expected, error),
      };
};

/**
 * Assert that a given input is passed by a validator
 *
 * @category Testing
 * @example
 *   expect("1").toBeValidatedBy(isNaturalNumberString);
 *
 * @param validator - The validator
 */
export const toBeValidatedBy = <T>(input: unknown, validator: Validator<T>) =>
  toValidate(validator, input);

/**
 * Assert that a given input is failed by a validator
 *
 * @category Testing
 * @example
 *   expect({}).toBeInvalidatedBy(isNaturalNumberString);
 *
 * @param validator - The validator
 */
export const toBeInvalidatedBy = <T>(input: unknown, validator: Validator<T>) =>
  toInvalidate(validator, input);
