import { isEmail, isUrl } from "./regexes";
import { suite } from "../testing/suite";

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

suite(
  isUrl,
  [
    {
      input: "https://domain.com/a/b/c",
      parsed: {
        match: "https://domain.com/a/b/c",
        index: 0,
        captured: ["https", "domain.com", "/a/b/c"],
        named: { scheme: "https", domain: "domain.com", path: "/a/b/c" },
      },
    },

    {
      input: "https://domain.com/a?b=c",
      parsed: {
        match: "https://domain.com/a?b=c",
        index: 0,
        captured: ["https", "domain.com", "/a?b=c"],
        named: { scheme: "https", domain: "domain.com", path: "/a?b=c" },
      },
    },
    {
      input: "https://www.domain.com",
      parsed: {
        match: "https://www.domain.com",
        index: 0,
        captured: ["https", "www.domain.com"],
        named: { scheme: "https", domain: "www.domain.com" },
      },
    },
    {
      input: "ftp://domain.com",
      parsed: {
        match: "ftp://domain.com",
        index: 0,
        captured: ["ftp", "domain.com"],
        named: { scheme: "ftp", domain: "domain.com" },
      },
    },
  ],
  {
    "Not a url": [
      "",
      "domain",
      "domain.com/a/b/c",
      "http://domain",
      "http://domain.",
      "https://domain.c",
      "https://.domain.com",
      "https://domain-com/a/b/c",
    ],
  },
);
