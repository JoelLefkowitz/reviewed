interface Valid<T> {
  valid: true;
  parsed: T;
  error: null;
}

interface Invalid {
  valid: false;
  parsed: null;
  error: string;
}

export type Validated<T> = { input: unknown } & (Valid<T> | Invalid);

export type Validator<T> = (obj: unknown) => Validated<T>;
