import { isEmail } from "./regexes";

describe("isEmail", () => {
  test.each([
    {
      input: "user@domain.com",
      parsed: {
        match: "user@domain.com",
        index: 0,
        captured: ["user", "domain.com"],
        named: { user: "user", domain: "domain.com" },
      },
    },
    {
      input: "user.name@domain.com",
      parsed: {
        match: "user.name@domain.com",
        index: 0,
        captured: ["user.name", "domain.com"],
        named: { user: "user.name", domain: "domain.com" },
      },
    },
    {
      input: "user@sub.domain.com",
      parsed: {
        match: "user@sub.domain.com",
        index: 0,
        captured: ["user", "sub.domain.com"],
        named: { user: "user", domain: "sub.domain.com" },
      },
    },
  ])("validates $input as email", ({ input, parsed }) => {
    expect(isEmail).toValidateAs(input, parsed);
  });

  test.each([
    { input: "user", error: 'Not an email: "user"' },
    { input: "@domain.com", error: 'Not an email: "@domain.com"' },
    { input: "user@domain", error: 'Not an email: "user@domain"' },
    { input: "user-domain.com", error: 'Not an email: "user-domain.com"' },
    { input: "user~@domain.com", error: 'Not an email: "user~@domain.com"' },
  ])('fails $input with "$error"', ({ input, error }) => {
    expect(isEmail).toInvalidateWith(input, error);
  });
});
