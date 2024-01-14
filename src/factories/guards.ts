import { Validator } from "../models/Validated.model";
import { invalidate, validate } from "./validate";

export const guard =
  <T>(validator: Validator<T>) =>
  (input: unknown): input is T =>
    validator(input).valid;

export const fromGuard =
  <T>(guard: (input: unknown) => input is T, reason: string): Validator<T> =>
  (input: unknown) =>
    guard(input) ? validate(input) : invalidate(input, reason);
