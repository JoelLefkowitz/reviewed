import { Validated } from "../validation/Validated.model";

/**
 * @typeParam T - the validated type
 */
export type ValidatedFields<T> = {
  [P in keyof T]: Validated<T[P]>;
};
