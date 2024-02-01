import { Validated } from "./Validated.model";

/**
 * @typeParam T - the validated type
 * @typeParam U - the validation errors type
 */
export type Validator<T, U = string> = (input: unknown) => Validated<T, U>;
