import { Invalid } from "./Invalid.model";
import { Valid } from "./Valid.model";

/**
 * @typeParam T - the validated type
 * @typeParam U - the validation errors type
 */
export type Validated<T, U = string> = Valid<T> | Invalid<U>;
