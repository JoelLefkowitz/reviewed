import { Invalid } from "./Invalid.model";
import { Valid } from "./Valid.model";

/**
 * ...
 *
 * @typeParam T - the validated type
 */
export type Validated<T> = { input: unknown } & (Valid<T> | Invalid);
