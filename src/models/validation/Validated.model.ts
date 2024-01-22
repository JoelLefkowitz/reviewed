import { Invalid } from "./Invalid.model";
import { Valid } from "./Valid.model";

export type SubMap<T> = { [P in keyof T]?: string };
export type Errors<T> = string | string[] | SubMap<T>;

/**
 * @typeParam T - the validated type
 */
export type Validated<T, U extends Errors<T> = string> = Valid<T> | Invalid<U>;

export type ArrayInline<T> = {
  [P in keyof T]: T[P][];
};

export type ValidatedInline<T> = {
  [P in keyof T]: Validated<T[P]>;
};
