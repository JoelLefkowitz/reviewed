import { isEmail } from "./regexes";
import { suite } from "../testing/suites";

suite(
  isEmail,
  [
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
  ],
  {
    "Not an email": [
      "user",
      "@domain.com",
      "user@domain",
      "user-domain.com",
      "user~@domain.com",
    ],
  },
);
