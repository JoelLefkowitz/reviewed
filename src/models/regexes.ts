import { Validator } from "./validators";

/** @typeParam T - The validated type */
export interface RegexResult<T extends string> {
  match: string;
  index: number;
  captured: string[];
  named: Partial<Record<T, string>>;
}

/** @typeParam T - The validated type */
export type RegexValidator<T extends string> = Validator<RegexResult<T>>;
