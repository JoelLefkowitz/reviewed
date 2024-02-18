import { RegexValidator } from "../models/regexes";
import { validateRegex } from "../factories/regexes";

/**
 * Validate an email
 *
 * @category Validators
 * @example
 *   isEmail("user@domain.com") >>
 *     {
 *       valid: true,
 *       parsed: {
 *         match: "user@domain.com",
 *         index: 0,
 *         captured: ["user", "domain.com"],
 *         named: {
 *           user: "user",
 *           domain: "domain.com",
 *         },
 *       },
 *     };
 *
 *   isEmail("") >>
 *     {
 *       valid: false,
 *       error: 'Not an email: ""',
 *     };
 *
 * @typeParam T - The validated type
 * @param input - The raw input
 */
export const isEmail: RegexValidator<"user" | "domain"> = validateRegex(
  /^(?<user>[a-zA-Z0-9_.+-]+)@(?<domain>[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)$/u,
  "Not an email",
);
