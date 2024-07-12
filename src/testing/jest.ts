import {
  toBeInvalidatedBy,
  toBeValidatedBy,
  toInvalidate,
  toInvalidateWith,
  toValidate,
  toValidateAs,
} from "./matchers";

declare global {
  namespace jest {
    interface Matchers<R> {
      toValidate(input: unknown): R;
      toInvalidate(input: unknown): R;

      toValidateAs(input: unknown, target: unknown): R;
      toInvalidateWith(input: unknown, target: unknown): R;

      toBeValidatedBy(validator: unknown): R;
      toBeInvalidatedBy(validator: unknown): R;
    }
  }
}

expect.extend({
  toValidate,
  toInvalidate,
  toValidateAs,
  toInvalidateWith,
  toBeValidatedBy,
  toBeInvalidatedBy,
});
