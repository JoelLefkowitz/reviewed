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
