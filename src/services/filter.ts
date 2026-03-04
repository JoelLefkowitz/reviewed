import { Validator } from "../models/validators";
import { guard } from "../factories/guards";
import { isArray } from "../validators/arrays";

/**
 * Filter an array of inputs with a validator
 *
 * @category Services
 * @example
 *   filterValid(isNumber)(["1", 2, "3"]) >> [2];
 *
 * @typeParam T - The validated type
 * @param validator - The validator to use
 */
export const filterValid =
  <T>(validator: Validator<T>) =>
  (input: unknown): T[] =>
    guard(isArray)(input)
      ? input.reduce<T[]>((acc, x) => {
          const { valid, parsed } = validator(x);
          return valid ? [...acc, parsed] : acc;
        }, [])
      : [];
