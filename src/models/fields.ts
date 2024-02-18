import { Validated, Validator } from "./validators";

/** @typeParam T - The validated type */
export type ArrayFields<T> = {
  [P in keyof T]: T[P][];
};

/** @typeParam T - The validated type */
export type ValidatedFields<T> = {
  [P in keyof T]: Validated<T[P]>;
};

/** @typeParam T - The validated type */
export type ValidatorFields<T> = {
  [P in keyof T]: Validator<T[P]>;
};
