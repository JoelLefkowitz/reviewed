/**
 * ...
 *
 * @typeParam T - the validated type
 */
export interface ParsedRegex<T extends string> {
  match: string;
  index: number;
  captured: string[];
  named: Partial<Record<T, string>>;
}
