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

export const rejection = (input: unknown, reason: string): string =>
  `${reason}: ${serialize(input)}`;
