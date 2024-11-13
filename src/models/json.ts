export type JSON =
  | Partial<{ [key: string]: JSON }>
  | JSON[]
  | string
  | number
  | boolean
  | null;
