import { Validator } from "../validation/Validator.model";

/**
 * @typeParam T - the validated type
 */
export type ValidatorFields<T> = {
  [P in keyof T]: Validator<T[P]>;
};
