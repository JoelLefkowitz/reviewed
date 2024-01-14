import { Validator } from "./Validated.model";

export interface ValidatorTest<T> {
  name: string;
  validator: Validator<T>;
  valid: [unknown, T][];
  invalid: Record<string, unknown[]>;
}
