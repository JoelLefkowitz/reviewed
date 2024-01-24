import { Invalid } from "./Invalid.model";
import { Valid } from "./Valid.model";
import { ValidationErrors } from "./ValidationErrors.model";

/**
 * @typeParam T - the validated type
 * @typeParam U - the validation errors type
 */
export type Validated<T, U extends ValidationErrors<T> = string> =
  | Valid<T>
  | Invalid<U>;
