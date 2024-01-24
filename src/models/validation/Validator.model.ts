import { Validated } from "./Validated.model";

/**
 * @typeParam T - the validated type
 */
export type Validator<T> = (obj: unknown) => Validated<T>;
