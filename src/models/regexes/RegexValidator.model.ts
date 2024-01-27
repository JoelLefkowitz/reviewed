import { ParsedRegex } from "./ParsedRegex.model";
import { Validated } from "../validation/Validated.model";

/**
 * @typeParam T - the validated type
 */
export type RegexValidator<T extends string = ""> = (
  input: unknown,
) => Validated<ParsedRegex<T>>;
