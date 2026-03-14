# Reviewed

Ergonomic, extensible and lightweight validators.

![Review](https://img.shields.io/github/actions/workflow/status/JoelLefkowitz/reviewed/review.yaml)
![Version](https://img.shields.io/npm/v/reviewed)
![Downloads](https://img.shields.io/npm/dw/reviewed)
![Size](https://img.shields.io/bundlephobia/min/reviewed)
![Quality](https://img.shields.io/codacy/grade/0c0c92a961d444ee9f65d961bf0e1293)
![Coverage](https://img.shields.io/codacy/coverage/0c0c92a961d444ee9f65d961bf0e1293)

## Motivation

1. I want to validate unknowns into plain objects I can consume:

```ts
import { isRecordOf, isString } from "reviewed";

const isPerson = isRecordOf({
  name: isString,
});

isPerson({ name: "Joel" });
```

```json
{
  "valid": true,
  "input": { "name": "Joel" },
  "parsed": { "name": "Joel" },
  "error": null
}
```

And if I pass something invalid it should give me consumable errors:

```ts
isPerson({ name: null });
```

```json
{
  "valid": false,
  "input": { "name": null },
  "parsed": null,
  "error": {
    "name": "Not a string: null"
  }
}
```

2. I want the compiler be able to infer all the types:

```ts
const { valid, parsed } = isPerson({ name: "Joel" });

if (valid) {
  // Type: { page: number, size: number }
  console.log(parsed);

  // Type: number
  console.log(parsed.page);
}
```

3. During validation I want to parse the data:

Parsing is already part of validation. `isNaturalNumberString` checks a value is a whole number saved as a string for example as a URL parameter.

Since the validator needs to assess the value contains a number already, it should be responsible for parsing it to a number type.

```ts
import { isRecordOf, isNaturalNumberString } from "reviewed";

const paginate = (url: URL): void => {
  const isPagination = isRecordOf({
    page: isNaturalNumberString,
    size: isNaturalNumberString,
  });

  const { valid, parsed, error } = isPagination({
    page: url.searchParams.get("page"),
    size: url.searchParams.get("size"),
  });

  if (valid) {
    // Parsed type: { page: number, size: number }
    console.log(parsed);
  } else {
    console.error(error);
  }
};
```

Now I lift numbers directly from the url:

```ts
paginate(new URL("https://example.com?page=1&size=10"));
```

```json
{
  "page": 1,
  "size": 10
}
```

And I can get useful error messages:

```ts
paginate(new URL("https://example.com?page=-1"));
```

```json
{
  "page": "Not a natural number string: '-1'",
  "size": "Not a string: null"
}
```

## Installing

```bash
npm install reviewed
```

## Documentation

Documentation and more detailed examples are hosted on [Github Pages](https://joellefkowitz.github.io/reviewed).

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
  - Tiny bundle size
  - Fully tree shakeable

`reviewed` exposes a flexible interface that achieves these goals.

```ts
isIntegerString("1");
```

```json
{
  "valid": true,
  "input": "1",
  "parsed": 1,
  "error": null
}
```

```ts
isIntegerString("0.5");
```

```json
{
  "valid": false,
  "input": "0.5",
  "parsed": null,
  "error": "Not an integer 0.5"
}
```

### Alternatives

Webpack warns when a bundle exceeds 250kb, validation is not an optional feature of an application. If the minified size of a package compromises this budget it simply won't be used.

| Package     | Version | Minified (kB) |
| ----------- | ------- | ------------- |
| joi         | 17.12.0 | 145.5         |
| ajv         | 8.12.0  | 119.6         |
| validator   | 13.11.0 | 114.2         |
| zod         | 3.22.4  | 57.0          |
| yup         | 1.3.3   | 40.8          |
| superstruct | 1.0.3   | 11.5          |

Superstruct has good TypeScript support and serves as an inspiration for this package. However, the validation style for this package is designed to be much simpler and more flexible than superstruct with less need for factory functions and simpler failure message customisation.

## Usage

### Writing validators

`numbers.ts`

```ts
import { Validator, isInteger, validateIf } from "reviewed";

export const isNaturalNumber: Validator<number> = (input: unknown) => {
  const integer = isInteger(input);

  if (!integer.valid) {
    return integer;
  }

  return validateIf(integer.parsed > 0, input, input, "Not a natural number");
};
```

### Combining validators

Validators can be chained to validate a payload:

```json
[{ "name": "a" }, { "name": "b" }]
```

```ts
export const isArrayOfNames = isArrayOf(
  isRecordOf({
    name: isString,
  }),
);
```

### Assertions

Validators can be told to throw an error if validation fails:

```ts
import { assert, isNumber } from "reviewed";

const parsed = assert(isNumber, x);

// Parsed type: number
console.log(parsed + 1);
```

### Guards

Guards can inform the compiler that the input satisfies a type predicate. This is thanks to TypeScript's `is` operator:

```ts
(input: unknown): input is string => {};
```

Validators already let the compiler know the output matches the validated type:

```ts
import { isNumber } from "reviewed";

const { valid, parsed } = isNumber(x);

if (valid) {
  // Parsed type: number
  console.log(parsed + 1);
}
```

If we convert this to a guard, the compiler will also confirm the input has the matching type:

```ts
import { guard, isNumber } from "reviewed";

if (guard(isNumber, input)) {
  // Parsed type: number
  console.log(input + 1);
}
```

### Optional fields

Validators can be made optional:

```ts
interface Person {
  name?: string;
}

const isPerson = isRecordOf<Person>({ name: optional(isString) });
```

```ts
isPerson({});
```

```json
{
  "valid": true,
  "parsed": { "name": "Joel" }
}
```

```ts
isPerson({ name: "Joel" });
```

```json
{
  "valid": true,
  "parsed": { "name": "Joel" }
}
```

Strictly speaking, `{ name: optional(isString) }` implies that the interface is `{ name: string | undefined }` which allows name to be explicitly undefined. Since this is never useful the interface is interpreted as being `{ name?: string }` which is simpler than having a separate function for strictly optional values.

Note that there has been lots of discussion around changing the way TypeScript handles undefined vs optional parameters: https://github.com/Microsoft/TypeScript/issues/12400. Rather than implementing some casts under the hood to fight the type checker this library leaves it up to the developer to be explicit:

```ts
const isPerson = isRecordOf<Person>({ name: optional(isString) });
```

Whereas this will throw an error when strict optional checking is enabled:

```ts
const isPerson: Validator<Person> = isRecordOf({ name: optional(isString) });
```

### Using literals

Array literals can be converted directly to validators:

```ts
const builds = ["dev", "prod"] as const;
const isBuild = isOneOf(builds);
```

```ts
isBuild("dev");
```

```json
{
  "valid": true,
  "parsed": [3, 1]
}
```

```ts
isBuild("local");
```

```json
{
  "valid": false,
  "error": "Not one of ['dev', 'prod']: 'local'"
}
```

### Testing validators

Custom Jest matchers are exposed for testing validators:

`jest.config.json`

```json
{
  "setupFilesAfterEnv": ["reviewed/dist/testing/globals.js"]
}
```

`tsconfig.json`

```json
{
  "files": ["node_modules/reviewed/dist/testing/globals.d.ts"]
}
```

```ts
import { isNaturalNumberString } from "./strings";

describe("isNaturalNumberString", () => {
  it("parses natural number strings", () => {
    expect(isNaturalNumberString).toValidate("1");
    expect(isNaturalNumberString).toInvalidate({});
    expect(isNaturalNumberString).toValidateAs("1", 1);
    expect(isNaturalNumberString).toInvalidateWith({}, "Not a string");
  });
});
```

### Overview

Validators take an `unknown` input and return a record that implements the `Valid` or `Invalid` interfaces:

```ts
interface Valid<T> {
  valid: true;
  input: unknown;
  parsed: T;
  error: null;
}

interface Invalid<T> {
  valid: false;
  input: unknown;
  parsed: null;
  error: ValidationErrors<T>;
}

type Validated<T> = Valid<T> | Invalid<T>;

type Validator<T> = (input: unknown) => Validated<T>;
```

Inputs can be validated directly:

```ts
const validate: <T>(input: unknown, parsed: unknown = input) => Validated<T>;
const invalidate: <T>(input: unknown, error: ValidationErrors<T>) => Validated<T>;

const validateWith: <T>(validators: ValidatorFields<T>) => Validator<T>;
const invalidateWith: <T>(reason: string) => Validator<T>;
```

Helper factories are provided:

```ts
const validateIf: <T>(condition: boolean, input: unknown, parsed: unknown, reason: string) => Validated<T[]>;
const validateRegex: <T extends string>(regex: RegExp, reason: string) => RegexValidator<T>;

const validateAll: <T>(validator: Validator<T>) => Validator<T[]>;
const validateEach: <T>(validator: Validator<T>) => Validator<T>[];

const validateOr: <T>(validator: Validator<T>, fallback: T) => (input: unknown) => T;
const validateEachOr: <T>(validator: Validator<T>, fallback: T) => (input: unknown) => T[];
```

Validators can be used to filter inputs:

```ts
const filterValid: <T>(validator: Validator<T>) => (input: unknown) => T[];
```

Validators can be inverted or joined:

```ts
const not: <T>(validator: Validator<T>, reason?: string) => Validator<T>;

const both: <T, U>(first: Validator<T>, second: Validator<U>) => Validator<T & U>;
const either: <T, U>(first: Validator<T>, second: Validator<U>) => Validator<T | U>;

const optional = <T>(validator: Validator<T>): Validator<T | undefined>;

const isArrayOf: <T>(validator: Validator<T>) => Validator<T[]>;
const isRecordOf: <T>(validators: ValidatorFields<T>) => Validator<T>;
```

Results can be merged:

```ts
const all: <T>(results: Validated<T>[]) => Validated<T[]>;
const any: <T>(results: Validated<T>[]) => Validated<T[]>;

const merge: <T>(results: ValidatedFields<T>) => Validated<T>;
const sieve: <T>(results: ValidatedFields<T>) => Partial<T>;
```

Validation errors can be converted to native errors:

```ts
const fail: <T>(errors: ValidationErrors<T>) => Error;
```

Common validators are provided out of the box:

```ts
const isUndefined: Validator<undefined>;
const isNull: Validator<null>;
const isBoolean: Validator<boolean>;
const isNumber: Validator<number>;
const isString: Validator<string>;
const isObject: Validator<object>;

const isInteger: Validator<number>;
const isNaturalNumber: Validator<number>;

const isBooleanString: Validator<boolean>;
const isNumberString: Validator<number>;
const isIntegerString: Validator<number>;
const isNaturalNumberString: Validator<number>;
const isJSONString: Validator<IJSON>;

const isArray: Validator<unknown[]>;
const isNonEmptyArray: Validator<unknown[]>;
const isNumberArray: Validator<number[]>;
const isStringArray: Validator<string[]>;

const isRecord: Validator<Record<string, unknown>>;
const isNonEmptyRecord: Validator<Record<string, unknown>>;

const isEmail: RegexValidator<"user" | "domain">;

const isOneOf: <T>(options: T[]) => Validator<T>;
const isManyOf: <T>(options: T[]) => Validator<T[]>;
```

## Discussion

### Reasonable types

JavaScript has some famously confusing types:

```ts
typeof NaN;
```

```json
"number"
```

Care is taken to make primitive types easier to work with.

#### Numbers

```ts
const isNumber: Validator<number> = (input: unknown) =>
  validateIf(typeof input === "number" && isFinite(input), input, input, "Not a number");
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
  validateIf(typeof input === "object" && input !== null, input, input, "Not an object");
```

| Input | Parsed | Error         |
| ----- | ------ | ------------- |
| \[]   | \[]    | null          |
| {}    | {}     | null          |
| ""    | null   | Not an object |

#### Records

```ts
const isRecord: Validator<Record<string, unknown>> = (input: unknown) =>
  validateIf(isObject(input).valid && !isArray(input).valid, input, input, "Not a record");
```

| Input | Parsed | Error         |
| ----- | ------ | ------------- |
| \[]   | null   | Not a record  |
| {}    | {}     | null          |
| ""    | null   | Not an object |

### Secret magic

Hey let's write an `isArrayOf` and `isRecordOf` function:

```ts
const isArrayOf: <T>(validator: Validator<T>) => Validator<T[]>;
const isRecordOf: <T>(validators: ValidatorFields<T>) => Validator<T>;
const isRecordOfAtLeast: <T>(validators: ValidatorFields<T>) => Validator<T>;
```

But wait we already have:

```ts
const validateAll: <T>(validator: Validator<T>) => Validator<T[]>;
const validateWith: <T>(validators: ValidatorFields<T>) => Validator<T>;
const validateWithAtLeast: <T>(validators: ValidatorFields<T>) => Validator<T>;
```

That's because they're the same thing woah...

![Celebration](https://media.giphy.com/media/vv8R20yaYZIKk/giphy.gif)

So we can just alias them:

```ts
export const isArrayOf = validateAll;
export const isRecordOf = validateWith;
export const isRecordOfAtLeast = validateWithAtLeast;
```

## Tooling

### Dependencies

To install dependencies:

```bash
yarn install
```

### Tests

To run tests:

```bash
yarn test
```

### Documentation

To generate the documentation locally:

```bash
yarn docs
```

### Linters

To run linters:

```bash
yarn lint
```

### Formatters

To run formatters:

```bash
yarn format
```

## Contributing

Please read this repository's [Code of Conduct](CODE_OF_CONDUCT.md) which outlines our collaboration standards and the [Changelog](CHANGELOG.md) for details on breaking changes that have been made.

This repository adheres to semantic versioning standards. For more information on semantic versioning visit [SemVer](https://semver.org).

Bump2version is used to version and tag changes. For example:

```bash
bump2version patch
```

### Contributors

- [Joel Lefkowitz](https://github.com/joellefkowitz) - Initial work

## Remarks

Lots of love to the open source community!

<div align='center'>
    <img width=200 height=200 src='https://media.giphy.com/media/osAcIGTSyeovPq6Xph/giphy.gif' alt='Be kind to your mind' />
    <img width=200 height=200 src='https://media.giphy.com/media/KEAAbQ5clGWJwuJuZB/giphy.gif' alt='Love each other' />
    <img width=200 height=200 src='https://media.giphy.com/media/WRWykrFkxJA6JJuTvc/giphy.gif' alt="It's ok to have a bad day" />
</div>
