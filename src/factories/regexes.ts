import { RegexResult, RegexValidator } from "../models/regexes";
import { guard } from "./guards";
import { invalidateWith } from "./invalidate";
import { isString } from "../validators/primitives";
import { validate } from "./validate";

/**
 * Validate an input given a regex
 *
 * @category Factories
 * @example
 *   validateRegex(
 *     /^(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})$/u,
 *     "Not a yyyy-mm-dd date",
 *   ) >>
 *     {
 *       valid: true,
 *       input: "1234-12-12",
 *       parsed: {
 *         match: "1234-12-12",
 *         index: 0,
 *         captured: ["1234", "12", "12"],
 *         named: { year: "1234", month: "12", day: "12" },
 *       },
 *       error: null,
 *     };
 *
 * @typeParam T - The validated type
 * @param regex  - The regex
 * @param reason - The failure explanation
 */
export const validateRegex =
  <T extends string>(regex: RegExp, reason: string): RegexValidator<T> =>
  (input: unknown) => {
    if (guard(isString)(input)) {
      const parsed = regex.exec(input);

      if (parsed !== null) {
        const [match, ...captured] = parsed;
        const { index, groups } = parsed;

        return validate(input, {
          match,
          index,
          captured,
          named: { ...groups },
        });
      }
    }

    return invalidateWith<RegexResult<T>>(reason)(input);
  };
