import { Validator } from "../models/validators";

export const validates = <T>(
  validator: Validator<T>,
  valid: { input: unknown; parsed: unknown }[],
  invalid: { input: unknown; error: unknown }[],
) => {
  it.each(valid)('validates "$input" as "$parsed"', ({ input, parsed }) => {
    expect(validator).toValidateAs(input, parsed);
  });

  it.each(invalid)('invalidates "$input" with "$error"', ({ input, error }) => {
    expect(validator).toInvalidateWith(input, error);
  });
};
