import {
  toInvalidate,
  toInvalidateWith,
  toValidate,
  toValidateAs,
} from "./matchers";

declare global {
  namespace jest {
    interface Matchers<R> {
      toValidate(input: unknown): R;
      toValidateAs(input: unknown, target: unknown): R;
      toInvalidate(input: unknown): R;
      toInvalidateWith(input: unknown, target: unknown): R;
    }
  }
}

expect.extend({
  toValidate,
  toValidateAs,
  toInvalidate,
  toInvalidateWith,
});
