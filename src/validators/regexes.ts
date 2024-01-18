import { RegexValidator } from "../models/regexes/RegexValidator.model";
import { validateRegex } from "../factories/validate";

/**
 * Validate an email
 *
 * @category Validators
 *
 * @typeParam T - the validated type
 * @param input - the raw input
 *
 * @example
 * ```ts
 * isEmail("user@domain.com") -> {
 *     valid: true,
 *     parsed: {
 *       match: "user@domain.com",
 *       index: 0,
 *       captured: ["user", "domain.com"],
 *       named: { user: "user", domain: "domain.com" },
 *     },
 *     ...
 *   }
 *
 * isEmail("") -> { valid: false, error: 'Not an email: ""', ... }
 * ```
 */
export const isEmail: RegexValidator<"user" | "domain"> = validateRegex(
  /^(?<user>[a-zA-Z0-9_.+-]+)@(?<domain>[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)$/u,
  "Not an email",
);

/**
 * Validate a url
 *
 * @category Validators
 *
 * @typeParam T - the validated type
 * @param input - the raw input
 *
 * @example
 * ```ts
 * isUrl("https://domain.com/a/b/c") -> {
 *     valid: true,
 *     parsed: {
 *       match: "https://domain.com/a/b/c",
 *       index: 0,
 *       captured: ["https", "domain.com", "/a/b/c"],
 *       named: { scheme: "https", domain: "domain.com", path: "/a/b/c" },
 *     },
 *     ...
 *   }
 *
 * isUrl("") -> { valid: false, error: 'Not a url: ""', ... }
 * ```
 */
export const isUrl: RegexValidator<"scheme" | "domain" | "path"> =
  validateRegex(
    /^(?:(?:(?<scheme>https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?<domain>(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?<path>[/?#]\S*)?$/iu,
    "Not a url",
  );
