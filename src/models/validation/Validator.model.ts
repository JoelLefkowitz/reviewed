import { Validated } from "./Validated.model";
import { ValidationErrors } from "./ValidationErrors.model";

/**
 * @typeParam T - the validated type
 * @typeParam U - the validation errors type
 */
export type Validator<T, U extends ValidationErrors<T> = string> = (
  obj: unknown
) => Validated<T, U>;
