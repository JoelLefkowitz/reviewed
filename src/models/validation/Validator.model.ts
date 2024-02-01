import { Validated } from "./Validated.model";
import { ValidationErrors } from "./ValidationErrors.model";

/**
 * @typeParam T - the validated type
 * @typeParam U - the validation errors type
 */
export type Validator<T, U = string | string[] | ValidationErrors<T>> = (
  input: unknown,
) => Validated<T, U>;
