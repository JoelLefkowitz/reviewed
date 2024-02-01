import { Invalid } from "./Invalid.model";
import { Valid } from "./Valid.model";
import { ValidationErrors } from "./ValidationErrors.model";

/**
 * @typeParam T - the validated type
 * @typeParam U - the validation errors type
 */
export type Validated<T, U = string | string[] | ValidationErrors<T>> =
  | Valid<T>
  | Invalid<U>;
