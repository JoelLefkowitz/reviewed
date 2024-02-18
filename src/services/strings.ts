/**
 * Serialize an object preserving literal values
 *
 * @category Services
 * @example
 *   serialize(Infinity) >> '"Infinity"';
 *   serialize({ a: 1, b: 2 }) >> '{"a": 1, "b": 2}';
 *
 * @param input - The object to serialize
 */
export const serialize = (input: unknown): string =>
  JSON.stringify(input, (_, token: unknown) => {
    if (token === undefined) {
      return "undefined";
    }

    if (
      typeof token === "number" &&
      (isNaN(token) || [Infinity, -Infinity].includes(token))
    ) {
      return token.toString();
    }

    return token;
  })
    .replace(/,/gu, ", ")
    .replace(/":/gu, '": ');
