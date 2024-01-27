# Reviewed

Ergonomic, extensible and lightweight validators.

![review_action](https://img.shields.io/github/actions/workflow/status/JoelLefkowitz/reviewed/review.yml)
![npm_version](https://img.shields.io/npm/v/reviewed)
![npm_downloads](https://img.shields.io/npm/dw/reviewed)
![npm_bundle_size](https://img.shields.io/bundlephobia/min/reviewed)
![codacy_quality](https://img.shields.io/codacy/grade/0c0c92a961d444ee9f65d961bf0e1293)
![codacy_coverage](https://img.shields.io/codacy/coverage/0c0c92a961d444ee9f65d961bf0e1293)

## Motivation

I want to validate unknowns and for the compiler to know the parsed type:

```ts
import { isNumber } from "reviewed";

const parse = (input: unknown) => {
  const { valid, parsed } = isNumber(input);

  if (valid) {
    // Parsed type: number
    console.log(parsed);
  }
};
```

I want to validate an object and get failure messages for each field:

```ts
import { errors, isNaturalNumberString } from "reviewed";

const pagination = (url: URL): void => {
  const { valid, parsed, error } = validateWith(
    {
      page: isNaturalNumberString,
      size: isNaturalNumberString,
    },
    {
      page: url.searchParams.get("page"),
      size: url.searchParams.get("size"),
    }
  );

  if (valid) {
    console.log(parsed);
  } else {
    console.error(error);
  }
};
```

```ts
pagination(new URL("https://example.com?page=1&size=10")) ->
  { page: 1, size: 10 };
```

```ts
pagination(new URL("https://example.com?page=-1")) ->
  { page: 'Not a natural number string: "-1"', size: "Not a string: null" };
```

## Installing

```bash
npm install reviewed
```

## Design

A validation library for TypeScript needs to be:

- Ergonomic
  - Validated types can be inferred by the compiler
  - Validators can parse the inputs
  - Errors are easy to collect
- Extensible
  - It is quick to write validators
  - It is simple to test validators
  - Common validators are available
- Lightweight
  - Dependency free
  - Tiny bundle size (< 10Kb)
  - Fully tree shakeable

`reviewed` exposes a flexible interface that achieves these goals.

```ts
isIntegerString("1") -> { valid: true, parsed: 1, ... }
```

```ts
isIntegerString("0.5") -> { valid: false, error: "Not an integer 0.5", ... }
```

### Alternatives

Webpack warns when a bundle exceeds 250kb, validation is not an optional feature of a web application. If the minified size of a package compromises this budget it simply won't be used.

| Package     | Version | Minified (kB) |
| ----------- | ------- | ------------- |
| joi         | 17.12.0 | 145.5         |
| ajv         | 8.12.0  | 119.6         |
| validator   | 13.11.0 | 114.2         |
| zod         | 3.22.4  | 57.0          |
| yup         | 1.3.3   | 40.8          |
| superstruct | 1.0.3   | 11.5          |

Superstruct has good TypeScript support and serves as an inspiration for this package. However, the validation style for this package is designed to be much simpler and more flexible than superstruct with less need for factory functions and simpler error message customisation.

## Usage

### Writing validators

`numbers.ts`

```ts
import { Validator, isInteger, validateIf } from "reviewed";

export const isNaturalNumber: Validator<number> = (input: unknown) => {
  const isIntegerCheck = isInteger(input);

  if (!isIntegerCheck.valid) {
    return isIntegerCheck;
  }

  return validateIf(
    isIntegerCheck.parsed > 0,
    input,
    input,
    "Not a natural number"
  );
};
```

### Testing validators

`numbers.spec.ts`

```ts
import { isNaturalNumber } from "./numbers";
import { suite } from "reviewed";

suite(isNaturalNumber, [{ input: 1, parsed: 1 }], {
  "Not a number": [undefined, null, true, "", "a", [], {}, NaN, Infinity],
  "Not an integer": [0.5],
  "Not a natural number": [-1, 0],
});
```

### Guards

Guards can inform the compiler that the input satisfies a type predicate. This is thanks to TypeScript's `is` operator:

```ts
(input: unknown): input is string => { ... }
```

Validators make assertions about the parsed type:

```ts
import { isNumber } from "reviewed";

const { valid, parsed } = isNumber(x);

if (valid) {
  // Parsed type: number
  console.log(parsed + 1);
}
```

We can convert this to a guard and apply the assertion to the input instead:

```ts
import { guard, isNumber } from "reviewed";

if (guard(isNumber)(input)) {
  // Parsed type: number
  console.log(input + 1);
}
```

### Reasonable types

JavaScript has some famously confusing types:

```ts
typeof NaN -> "number";
```

Care is taken to make primitive types easier to work with.

#### Numbers

```ts
const isNumber: Validator<number> = (input: unknown) =>
  validateIf(
    typeof input === "number" && isFinite(input),
    input,
    input,
    "Not a number"
  );
```

| Input    | Parsed | Error         |
| -------- | ------ | ------------- |
| 1        | 1      | null          |
| NaN      | null   | Not an number |
| Infinity | null   | Not an number |
| ""       | null   | Not an number |

#### Objects

```ts
const isObject: Validator<object> = (input: unknown) =>
  validateIf(
    typeof input === "object" && input !== null,
    input,
    input,
    "Not an object"
  );
```

| Input | Parsed | Error         |
| ----- | ------ | ------------- |
| \[]   | \[]    | null          |
| {}    | {}     | null          |
| ""    | null   | Not an object |

#### Records

```ts
const isRecord: Validator<Record<string | number | symbol, unknown>> = (
  input: unknown
) =>
  validateIf(
    isObject(input).valid && !isArray(input).valid,
    input,
    input,
    "Not a record"
  );
```

| Input | Parsed | Error         |
| ----- | ------ | ------------- |
| \[]   | null   | Not a record  |
| {}    | {}     | null          |
| ""    | null   | Not an object |

## Documentation

Documentation and more detailed examples are hosted on [Github Pages](https://joellefkowitz.github.io/reviewed).

## Tooling

### Tests

To run tests:

```bash
npm run test
```

### Documentation

To generate the documentation locally:

```bash
npm run docs
```

### Linters

To run linters:

```bash
npm run lint
```

### Formatters

To run formatters:

```bash
npm run format
```

## Continuous integration

This repository uses GitHub Actions to lint and test each commit. Each commit should be formatted and its corresponding documentation should be updated.

## Versioning

This repository adheres to semantic versioning standards. For more information on semantic versioning visit [semver](https://semver.org).

Bump2version is used to version and tag changes. For example:

```bash
bump2version patch
```

## Changelog

Please read this repository's [changelog](CHANGELOG.md) for details on changes that have been made.

## Contributing

Please read this repository's guidelines on [contributing](CONTRIBUTING.md) for details on the process for submitting pull requests. Moreover, our [code of conduct](CODE_OF_CONDUCT.md) declares our collaboration standards.

## Contributors

- [Joel Lefkowitz](https://github.com/joellefkowitz) - Initial work

## Remarks

Lots of love to the open source community!

<p align='center'>
    <img width=200 height=200 src='https://media.giphy.com/media/osAcIGTSyeovPq6Xph/giphy.gif' alt='Be kind to your mind' />
    <img width=200 height=200 src='https://media.giphy.com/media/KEAAbQ5clGWJwuJuZB/giphy.gif' alt='Love each other' />
    <img width=200 height=200 src='https://media.giphy.com/media/WRWykrFkxJA6JJuTvc/giphy.gif' alt="It's ok to have a bad day" />
</p>
