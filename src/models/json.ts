export type IJSON =
  | string
  | number
  | boolean
  | null
  | { [key: string]: IJSON }
  | IJSON[];
